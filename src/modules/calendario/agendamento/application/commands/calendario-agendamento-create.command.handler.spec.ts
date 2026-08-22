import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockColecaoSyncService,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoCreateCommandHandlerImpl } from "./calendario-agendamento-create.command.handler";

function createMockTurmaFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
}

function createMockAmbienteFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
}

function createValidDto() {
  return {
    tipo: CalendarioAgendamentoTipo.AULA,
    nome: "Aula de Matemática",
    cor: "#2f9e41",
    dataInicio: "2026-03-01",
    dataFim: null,
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
    turmas: [{ id: createTestId() }],
    perfis: [],
    ambientes: [],
  };
}

describe("CalendarioAgendamentoCreateCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      permissionChecker?: object;
      turmaFindOneHandler?: object;
      ambienteFindOneHandler?: object;
      colecaoSyncService?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const turmaFindOneHandler = overrides.turmaFindOneHandler ?? createMockTurmaFindOneHandler();
    const ambienteFindOneHandler =
      overrides.ambienteFindOneHandler ?? createMockAmbienteFindOneHandler();
    const colecaoSyncService = overrides.colecaoSyncService ?? createMockColecaoSyncService();

    const handler = new CalendarioAgendamentoCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      turmaFindOneHandler as any,
      ambienteFindOneHandler as any,
      colecaoSyncService as any,
    );

    return {
      handler,
      repository,
      permissionChecker,
      turmaFindOneHandler,
      ambienteFindOneHandler,
      colecaoSyncService,
    };
  }

  it("should create agendamento and return result from repository", async () => {
    const id = createTestId();
    const expectedResult = { id, nome: "Aula de Matemática" };

    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = createValidDto();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.save).toHaveBeenCalledOnce();
    expect(repository.saveMetadata).toHaveBeenCalledOnce();
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(
      accessContext,
      expect.any(String),
    );
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();
    const dto = createValidDto();

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(accessContext, { dto });
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanCreate.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, createValidDto())).rejects.toThrow("Forbidden");
  });

  it("should throw BadRequestException when findConflicting returns conflicts", async () => {
    const repository = createMockAgendamentoRepository();
    repository.findConflicting.mockResolvedValue([
      {
        id: createTestId(),
        identificadorExterno: "ext-1",
        recurso: "turma",
        recursoId: createTestId(),
      },
    ]);
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = createValidDto();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
  });

  it("should skip conflict check when no horarios provided", async () => {
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = {
      ...createValidDto(),
      horarioInicio: undefined,
      horarioFim: undefined,
    };

    await handler.execute(accessContext, dto);

    expect(repository.findConflicting).not.toHaveBeenCalled();
  });

  it("should save metadata (nome/cor) separately", async () => {
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = createValidDto();

    await handler.execute(accessContext, dto);

    expect(repository.saveMetadata).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: "Aula de Matemática",
        cor: "#2f9e41",
      }),
    );
  });

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after save", async () => {
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, createValidDto())).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw BadRequestException when horario falls outside a recognized turno's window", async () => {
    const turmaId = createTestId();
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const turmaFindOneHandler = createMockTurmaFindOneHandler();
    turmaFindOneHandler.execute.mockResolvedValue({
      id: turmaId,
      nome: "Turma A",
      periodo: "Matutino",
    });

    const { handler } = createHandler({ repository, turmaFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto = {
      ...createValidDto(),
      turmas: [{ id: turmaId }],
      horarioInicio: "19:00:00",
      horarioFim: "20:00:00",
    };

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
  });

  it("should pass silently when periodo does not match any known turno pattern", async () => {
    const turmaId = createTestId();
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const turmaFindOneHandler = createMockTurmaFindOneHandler();
    turmaFindOneHandler.execute.mockResolvedValue({
      id: turmaId,
      nome: "Turma B",
      periodo: "Turno Especial XYZ",
    });

    const { handler } = createHandler({ repository, turmaFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto = {
      ...createValidDto(),
      turmas: [{ id: turmaId }],
      horarioInicio: "19:00:00",
      horarioFim: "20:00:00",
    };

    await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
  });

  it("should pass when horario falls inside the recognized turno's window", async () => {
    const turmaId = createTestId();
    const repository = createMockAgendamentoRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const turmaFindOneHandler = createMockTurmaFindOneHandler();
    turmaFindOneHandler.execute.mockResolvedValue({
      id: turmaId,
      nome: "Turma C",
      periodo: "Noturno",
    });

    const { handler } = createHandler({ repository, turmaFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto = {
      ...createValidDto(),
      turmas: [{ id: turmaId }],
      horarioInicio: "19:00:00",
      horarioFim: "20:00:00",
    };

    await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
  });

  describe("validação de capacidade do ambiente", () => {
    it("should throw BadRequestException when sum of numeroEstimadoAlunos exceeds ambiente capacidade", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        numeroEstimadoAlunos: 40,
      });

      const ambienteFindOneHandler = createMockAmbienteFindOneHandler();
      ambienteFindOneHandler.execute.mockResolvedValue({
        id: ambienteId,
        nome: "Laboratório 1",
        capacidade: 30,
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler, ambienteFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
    });

    it("should pass when sum of numeroEstimadoAlunos does not exceed ambiente capacidade", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        numeroEstimadoAlunos: 20,
      });

      const ambienteFindOneHandler = createMockAmbienteFindOneHandler();
      ambienteFindOneHandler.execute.mockResolvedValue({
        id: ambienteId,
        nome: "Laboratório 1",
        capacidade: 30,
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler, ambienteFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    });

    it("should skip capacidade validation silently when turma has no numeroEstimadoAlunos", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        numeroEstimadoAlunos: null,
      });

      const ambienteFindOneHandler = createMockAmbienteFindOneHandler();
      ambienteFindOneHandler.execute.mockResolvedValue({
        id: ambienteId,
        nome: "Laboratório 1",
        capacidade: 1,
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler, ambienteFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    });

    it("should skip capacidade validation silently when ambiente has no capacidade", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        numeroEstimadoAlunos: 999,
      });

      const ambienteFindOneHandler = createMockAmbienteFindOneHandler();
      ambienteFindOneHandler.execute.mockResolvedValue({
        id: ambienteId,
        nome: "Laboratório 1",
        capacidade: null,
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler, ambienteFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    });
  });

  describe("herança de colecaoPadrao do curso", () => {
    it("should inherit colecaoPadrao from the first turma's curso when dto does not provide colecao", async () => {
      const turmaId = createTestId();
      const colecaoPadraoId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        curso: { colecaoPadrao: { id: colecaoPadraoId } },
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        colecao: undefined,
      };

      await handler.execute(accessContext, dto);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ colecao: { id: colecaoPadraoId } }),
      );
    });

    it("should not override colecao when dto explicitly provides another colecao", async () => {
      const turmaId = createTestId();
      const colecaoPadraoId = createTestId();
      const colecaoExplicitaId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        curso: { colecaoPadrao: { id: colecaoPadraoId } },
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        colecao: { id: colecaoExplicitaId },
      };

      await handler.execute(accessContext, dto);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ colecao: { id: colecaoExplicitaId } }),
      );
    });

    it("should not set colecao when turma's curso has no colecaoPadrao", async () => {
      const turmaId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const turmaFindOneHandler = createMockTurmaFindOneHandler();
      turmaFindOneHandler.execute.mockResolvedValue({
        id: turmaId,
        nome: "Turma A",
        periodo: "Integral",
        curso: { colecaoPadrao: null },
      });

      const { handler } = createHandler({ repository, turmaFindOneHandler });
      const accessContext = createTestAccessContext();
      const dto = {
        ...createValidDto(),
        turmas: [{ id: turmaId }],
        colecao: undefined,
      };

      await handler.execute(accessContext, dto);

      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ colecao: null }));
    });
  });

  describe("colecao sync hook", () => {
    it("should register a sync change when the agendamento has a colecao", async () => {
      const colecaoId = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });
      const accessContext = createTestAccessContext();
      const dto = { ...createValidDto(), colecao: { id: colecaoId } };

      await handler.execute(accessContext, dto);

      expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
        colecaoId,
        agendamentoId: expect.any(String),
        tipoOperacao: "create",
      });
    });

    it("should not register a sync change when the agendamento has no colecao", async () => {
      const repository = createMockAgendamentoRepository();
      repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, createValidDto());

      expect(colecaoSyncService.registrarMudanca).not.toHaveBeenCalled();
    });
  });
});
