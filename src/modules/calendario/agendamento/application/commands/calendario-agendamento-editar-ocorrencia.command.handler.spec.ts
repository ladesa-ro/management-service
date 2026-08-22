import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockColecaoSyncService,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoEditarOcorrenciaCommandHandlerImpl } from "./calendario-agendamento-editar-ocorrencia.command.handler";

function criarSerieRecorrente(overrides: Record<string, unknown> = {}) {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-02",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
    repeticao: "FREQ=WEEKLY;COUNT=10",
    turmas: [{ id: createTestId() }],
    ...overrides,
  });
}

describe("CalendarioAgendamentoEditarOcorrenciaCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      permissionChecker?: object;
      colecaoSyncService?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const colecaoSyncService = overrides.colecaoSyncService ?? createMockColecaoSyncService();

    const handler = new CalendarioAgendamentoEditarOcorrenciaCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      colecaoSyncService as any,
    );

    return { handler, repository, permissionChecker, colecaoSyncService };
  }

  it("should create an exception referencing the origin series", async () => {
    const serie = criarSerieRecorrente();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue({ id: "excecao-id" });

    const { handler } = createHandler({ repository });

    const result = await handler.execute(createTestAccessContext(), {
      id: serie.id,
      dataOcorrencia: "2026-03-09",
      horarioInicio: "10:00:00",
    });

    expect(result).toEqual({ id: "excecao-id" });
    expect(repository.save).toHaveBeenCalledOnce();

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.identificadorExternoSerieOrigem).toBe(serie.identificadorExterno);
    expect(salvo.dataOcorrenciaReferenciada).toBe("2026-03-09");
    expect(salvo.horarioInicio).toBe("10:00:00");
    expect(salvo.repeticao).toBeNull();
  });

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
        dataOcorrencia: "2026-03-09",
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should exclude the origin series from the conflict check", async () => {
    const serie = criarSerieRecorrente();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue({ id: "excecao-id" });

    const { handler } = createHandler({ repository });

    await handler.execute(createTestAccessContext(), {
      id: serie.id,
      dataOcorrencia: "2026-03-09",
    });

    expect(repository.findConflicting).toHaveBeenCalledWith(
      expect.objectContaining({ excludeIdentificadorExterno: serie.identificadorExterno }),
    );
  });

  it("should throw BadRequestException when findConflicting returns conflicts", async () => {
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
        dataOcorrencia: "2026-03-09",
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should throw when the origin series does not exist", async () => {
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });

    await expect(
      handler.execute(createTestAccessContext(), {
        id: createTestId(),
        dataOcorrencia: "2026-03-09",
      }),
    ).rejects.toThrow();
  });

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after save", async () => {
    const serie = criarSerieRecorrente();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });

    await expect(
      handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
      }),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should inherit colecao from the origin series when dto does not provide colecao", async () => {
    const serie = criarSerieRecorrente({ colecao: { id: createTestId() } });

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue({ id: "excecao-id" });

    const { handler } = createHandler({ repository });

    await handler.execute(createTestAccessContext(), {
      id: serie.id,
      dataOcorrencia: "2026-03-09",
    });

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.colecao).toEqual(serie.colecao);
  });

  it("should not override colecao when dto explicitly provides another colecao", async () => {
    const serie = criarSerieRecorrente({ colecao: { id: createTestId() } });
    const colecaoExplicita = { id: createTestId() };

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue({ id: "excecao-id" });

    const { handler } = createHandler({ repository });

    await handler.execute(createTestAccessContext(), {
      id: serie.id,
      dataOcorrencia: "2026-03-09",
      colecao: colecaoExplicita,
    });

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.colecao).toEqual(colecaoExplicita);
    expect(salvo.colecao).not.toEqual(serie.colecao);
  });

  describe("colecao sync hook", () => {
    it("should register a sync change when the exception has a colecao", async () => {
      const colecaoId = createTestId();
      const serie = criarSerieRecorrente({ colecao: { id: colecaoId } });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "excecao-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
      });

      expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
        colecaoId,
        agendamentoId: expect.any(String),
        tipoOperacao: "editar-ocorrencia",
      });
    });

    it("should not register a sync change when the exception has no colecao", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "excecao-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
      });

      expect(colecaoSyncService.registrarMudanca).not.toHaveBeenCalled();
    });
  });
});
