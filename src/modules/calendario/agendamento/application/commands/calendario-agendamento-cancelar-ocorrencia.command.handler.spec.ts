import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import {
  PreconditionFailedError,
  ResourceNotFoundError,
} from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockColecaoSyncService,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoCancelarOcorrenciaCommandHandlerImpl } from "./calendario-agendamento-cancelar-ocorrencia.command.handler";

function criarSerieRecorrente(overrides: Record<string, unknown> = {}) {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-02",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
    repeticao: "FREQ=WEEKLY;COUNT=10",
    ...overrides,
  });
}

describe("CalendarioAgendamentoCancelarOcorrenciaCommandHandler", () => {
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

    const handler = new CalendarioAgendamentoCancelarOcorrenciaCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      colecaoSyncService as any,
    );

    return { handler, repository, permissionChecker, colecaoSyncService };
  }

  it("should create an INATIVO exception for the given date", async () => {
    const serie = criarSerieRecorrente();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue({ id: "cancelamento-id" });

    const { handler } = createHandler({ repository });

    const result = await handler.execute(createTestAccessContext(), {
      id: serie.id,
      dataOcorrencia: "2026-03-09",
      motivo: "Feriado",
    });

    expect(result).toEqual({ id: "cancelamento-id" });

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.status).toBe(CalendarioAgendamentoStatus.INATIVO);
    expect(salvo.identificadorExternoSerieOrigem).toBe(serie.identificadorExterno);
    expect(salvo.dataOcorrenciaReferenciada).toBe("2026-03-09");
    expect(salvo.motivo).toBe("Feriado");
  });

  it("should not run a conflict check (an INATIVO row cannot conflict)", async () => {
    const serie = criarSerieRecorrente();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(serie);
    repository.getFindOneQueryResult.mockResolvedValue({ id: "cancelamento-id" });

    const { handler } = createHandler({ repository });

    await handler.execute(createTestAccessContext(), {
      id: serie.id,
      dataOcorrencia: "2026-03-09",
    });

    expect(repository.findConflicting).not.toHaveBeenCalled();
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

  describe("colecao sync hook", () => {
    it("should register a sync change when the cancelamento has a colecao", async () => {
      const colecaoId = createTestId();
      const serie = criarSerieRecorrente({ colecao: { id: colecaoId } });

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "cancelamento-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
      });

      expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
        colecaoId,
        agendamentoId: expect.any(String),
        tipoOperacao: "cancelar-ocorrencia",
      });
    });

    it("should not register a sync change when the cancelamento has no colecao", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "cancelamento-id" });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });

      await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
      });

      expect(colecaoSyncService.registrarMudanca).not.toHaveBeenCalled();
    });
  });

  describe("escrita condicional (If-Match)", () => {
    it("should proceed when ifMatch matches the current version", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "cancelamento-id" });

      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
        ifMatch: String(serie.version),
      });

      expect(result).toEqual({ id: "cancelamento-id" });
    });

    it("should reject with PreconditionFailedError (412) when ifMatch is stale", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);

      const { handler } = createHandler({ repository });

      await expect(
        handler.execute(createTestAccessContext(), {
          id: serie.id,
          dataOcorrencia: "2026-03-09",
          ifMatch: String(serie.version + 1),
        }),
      ).rejects.toThrow(PreconditionFailedError);

      expect(repository.save).not.toHaveBeenCalled();
    });

    it("should proceed as before (regressão) when ifMatch is not provided", async () => {
      const serie = criarSerieRecorrente();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(serie);
      repository.getFindOneQueryResult.mockResolvedValue({ id: "cancelamento-id" });

      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        id: serie.id,
        dataOcorrencia: "2026-03-09",
      });

      expect(result).toEqual({ id: "cancelamento-id" });
    });
  });
});
