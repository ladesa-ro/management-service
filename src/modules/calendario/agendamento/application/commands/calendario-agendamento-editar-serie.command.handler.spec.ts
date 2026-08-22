import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { PreconditionFailedError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockColecaoSyncService,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import {
  CalendarioAgendamentoEscopoEdicaoSerie,
  CalendarioAgendamentoTipo,
} from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoConflitoService } from "../calendario-agendamento-conflito.service";
import { CalendarioAgendamentoEditarSerieCommandHandlerImpl } from "./calendario-agendamento-editar-serie.command.handler";

function criarSerieRecorrente(overrides: Record<string, unknown> = {}) {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-02",
    dataFim: "2026-03-02",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
    repeticao: "FREQ=DAILY;COUNT=10",
    turmas: [{ id: createTestId() }],
    ...overrides,
  });
}

function createMockPerfilFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
}

function createMockPerfilFindAllActiveHandler() {
  return { execute: vi.fn().mockResolvedValue([]) };
}

function createConflitoService(repository: object) {
  return new CalendarioAgendamentoConflitoService(
    repository as any,
    createMockPerfilFindOneHandler() as any,
    createMockPerfilFindAllActiveHandler() as any,
  );
}

describe("CalendarioAgendamentoEditarSerieCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      permissionChecker?: object;
      colecaoSyncService?: object;
      conflitoService?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const colecaoSyncService = overrides.colecaoSyncService ?? createMockColecaoSyncService();
    const conflitoService = overrides.conflitoService ?? createConflitoService(repository);

    const handler = new CalendarioAgendamentoEditarSerieCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      colecaoSyncService as any,
      conflitoService as any,
    );

    return { handler, repository, permissionChecker, colecaoSyncService, conflitoService };
  }

  it("should throw when the target agendamento is not recurring", async () => {
    const serie = CalendarioAgendamento.create({
      tipo: CalendarioAgendamentoTipo.EVENTO,
      dataInicio: "2026-03-02",
      diaInteiro: true,
    });

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);

    const { handler } = createHandler({ repository });

    await expect(
      handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  describe("escopo TODAS", () => {
    it("should create a new version of the root series with the changed fields", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
        horarioInicio: "10:00:00",
      });

      expect(result).toEqual({ id: "nova-versao-id" });
      expect(repository.saveNewVersion).toHaveBeenCalledOnce();

      const novaVersao = repository.saveNewVersion.mock.calls[0][1] as CalendarioAgendamento;
      expect(novaVersao.identificadorExterno).toBe(serie.identificadorExterno);
      expect(novaVersao.horarioInicio).toBe("10:00:00");
      expect(novaVersao.repeticao).toBe(serie.repeticao);

      expect(repository.save).not.toHaveBeenCalled();
      expect(repository.reatribuirExcecoesParaNovaSerie).not.toHaveBeenCalled();
    });

    it("should throw BadRequestException on conflict", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.findConflicting.mockResolvedValue([
        { id: createTestId(), identificadorExterno: "ext-1", recurso: "turma", recursoId: "t-1" },
      ]);

      const { handler } = createHandler({ repository });

      await expect(
        handler.execute(createTestAccessContext(), {
          id: serie.id,
          dataOcorrencia: "2026-03-06",
          escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should inherit colecao from the origin series when dto does not provide colecao", async () => {
      const serie = criarSerieRecorrente({ colecao: { id: createTestId() } });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const { handler } = createHandler({ repository });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
        horarioInicio: "10:00:00",
      });

      const novaVersao = repository.saveNewVersion.mock.calls[0][1] as CalendarioAgendamento;
      expect(novaVersao.colecao).toEqual(serie.colecao);
    });

    it("should not override colecao when dto explicitly provides another colecao", async () => {
      const serie = criarSerieRecorrente({ colecao: { id: createTestId() } });
      const colecaoExplicita = { id: createTestId() };

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const { handler } = createHandler({ repository });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
        colecao: colecaoExplicita,
      });

      const novaVersao = repository.saveNewVersion.mock.calls[0][1] as CalendarioAgendamento;
      expect(novaVersao.colecao).toEqual(colecaoExplicita);
      expect(novaVersao.colecao).not.toEqual(serie.colecao);
    });
  });

  describe("escopo ESTA_E_SEGUINTES", () => {
    it("should truncate the old series and create an independent new one from the cut date", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-serie-id" });

      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
        horarioInicio: "10:00:00",
      });

      expect(result).toEqual({ id: "nova-serie-id" });

      // Série antiga truncada via nova versão
      expect(repository.saveNewVersion).toHaveBeenCalledOnce();
      const antigaTruncada = repository.saveNewVersion.mock.calls[0][1] as CalendarioAgendamento;
      expect(antigaTruncada.identificadorExterno).toBe(serie.identificadorExterno);
      expect(antigaTruncada.repeticao).toContain("UNTIL=20260305");

      // Nova série, independente, a partir da data de corte
      expect(repository.save).toHaveBeenCalledOnce();
      const novaSerie = repository.save.mock.calls[0][0] as CalendarioAgendamento;
      expect(novaSerie.identificadorExterno).not.toBe(serie.identificadorExterno);
      expect(novaSerie.dataInicio).toBe("2026-03-06");
      expect(novaSerie.horarioInicio).toBe("10:00:00");

      // Exceções futuras reatribuídas para a nova série
      expect(repository.reatribuirExcecoesParaNovaSerie).toHaveBeenCalledWith({
        deIdentificadorExterno: serie.identificadorExterno,
        paraIdentificadorExterno: novaSerie.identificadorExterno,
        aPartirDe: "2026-03-06",
      });
    });

    it("should preserve the original duration on the new series", async () => {
      const serie = CalendarioAgendamento.create({
        tipo: CalendarioAgendamentoTipo.EVENTO,
        dataInicio: "2026-03-02",
        dataFim: "2026-03-04",
        diaInteiro: true,
        repeticao: "FREQ=WEEKLY;COUNT=3",
      });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-serie-id" });

      const { handler } = createHandler({ repository });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
      });

      const novaSerie = repository.save.mock.calls[0][0] as CalendarioAgendamento;
      expect(novaSerie.dataInicio).toBe("2026-03-09");
      expect(novaSerie.dataFim).toBe("2026-03-11");
    });

    it("should exclude the origin series from the new series' conflict check", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-serie-id" });

      const { handler } = createHandler({ repository });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
      });

      expect(repository.findConflicting).toHaveBeenCalledWith(
        expect.objectContaining({ excludeIdentificadorExterno: serie.identificadorExterno }),
      );
    });

    it("should throw BadRequestException on conflict and not persist anything", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.findConflicting.mockResolvedValue([
        { id: createTestId(), identificadorExterno: "ext-1", recurso: "turma", recursoId: "t-1" },
      ]);

      const { handler } = createHandler({ repository });

      await expect(
        handler.execute(createTestAccessContext(), {
          id: serie.id,
          dataOcorrencia: "2026-03-06",
          escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(repository.saveNewVersion).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });

    it("should inherit colecao from the origin series when dto does not provide colecao", async () => {
      const serie = criarSerieRecorrente({ colecao: { id: createTestId() } });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-serie-id" });

      const { handler } = createHandler({ repository });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
      });

      const novaSerie = repository.save.mock.calls[0][0] as CalendarioAgendamento;
      expect(novaSerie.colecao).toEqual(serie.colecao);
    });

    it("should not override colecao when dto explicitly provides another colecao", async () => {
      const serie = criarSerieRecorrente({ colecao: { id: createTestId() } });
      const colecaoExplicita = { id: createTestId() };

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-serie-id" });

      const { handler } = createHandler({ repository });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
        colecao: colecaoExplicita,
      });

      const novaSerie = repository.save.mock.calls[0][0] as CalendarioAgendamento;
      expect(novaSerie.colecao).toEqual(colecaoExplicita);
      expect(novaSerie.colecao).not.toEqual(serie.colecao);
    });
  });

  describe("colecao sync hook", () => {
    it("should register a sync change for escopo TODAS when there is a colecao", async () => {
      const colecaoId = createTestId();
      const serie = criarSerieRecorrente({ colecao: { id: colecaoId } });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
      });

      expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
        colecaoId,
        agendamentoId: expect.any(String),
        tipoOperacao: "editar-serie",
      });
    });

    it("should register a sync change for escopo ESTA_E_SEGUINTES when there is a colecao", async () => {
      const colecaoId = createTestId();
      const serie = criarSerieRecorrente({ colecao: { id: colecaoId } });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-serie-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.ESTA_E_SEGUINTES,
      });

      expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
        colecaoId,
        agendamentoId: expect.any(String),
        tipoOperacao: "editar-serie",
      });
    });

    it("should not register a sync change when there is no colecao", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
      });

      expect(colecaoSyncService.registrarMudanca).not.toHaveBeenCalled();
    });
  });

  describe("escrita condicional (If-Match)", () => {
    it("should proceed when ifMatch matches the current version", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
        ifMatch: String(serie.version),
      });

      expect(result).toEqual({ id: "nova-versao-id" });
    });

    it("should reject with PreconditionFailedError (412) when ifMatch is stale", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);

      const { handler } = createHandler({ repository });

      await expect(
        handler.execute(createTestAccessContext(), {
          id: serie.id,
          dataOcorrencia: "2026-03-06",
          escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
          ifMatch: String(serie.version + 1),
        }),
      ).rejects.toThrow(PreconditionFailedError);

      expect(repository.saveNewVersion).not.toHaveBeenCalled();
    });

    it("should proceed as before (regressão) when ifMatch is not provided", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "nova-versao-id" });

      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-06",
        escopo: CalendarioAgendamentoEscopoEdicaoSerie.TODAS,
      });

      expect(result).toEqual({ id: "nova-versao-id" });
    });
  });
});
