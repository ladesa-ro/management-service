import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
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
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoConflitoService } from "../calendario-agendamento-conflito.service";
import { CalendarioAgendamentoUpdateCommandHandlerImpl } from "./calendario-agendamento-update.command.handler";

function createActiveDomain(overrides: Record<string, unknown> = {}): CalendarioAgendamento {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-01",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
    ...overrides,
  });
}

function createMockTurmaFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
}

function createMockAmbienteFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
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

describe("CalendarioAgendamentoUpdateCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      permissionChecker?: object;
      turmaFindOneHandler?: object;
      ambienteFindOneHandler?: object;
      colecaoSyncService?: object;
      conflitoService?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const turmaFindOneHandler = overrides.turmaFindOneHandler ?? createMockTurmaFindOneHandler();
    const ambienteFindOneHandler =
      overrides.ambienteFindOneHandler ?? createMockAmbienteFindOneHandler();
    const colecaoSyncService = overrides.colecaoSyncService ?? createMockColecaoSyncService();
    const conflitoService = overrides.conflitoService ?? createConflitoService(repository);

    const handler = new CalendarioAgendamentoUpdateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      turmaFindOneHandler as any,
      ambienteFindOneHandler as any,
      colecaoSyncService as any,
      conflitoService as any,
    );

    return {
      handler,
      repository,
      permissionChecker,
      turmaFindOneHandler,
      ambienteFindOneHandler,
      colecaoSyncService,
      conflitoService,
    };
  }

  it("should update agendamento and return result from repository", async () => {
    const domain = createActiveDomain();
    const expectedResult = { id: domain.id, nome: "Aula atualizada" };

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = { id: domain.id, nome: "Aula atualizada" };

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.updateMetadata).toHaveBeenCalledOnce();
  });

  it("should call permissionChecker.ensureCanUpdate before updating", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();
    const dto = { id: domain.id, motivo: "Reagendamento" };

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanUpdate).toHaveBeenCalledWith(
      accessContext,
      { dto },
      domain.id,
    );
  });

  it("should throw ResourceNotFoundError when entity not found via loadById", async () => {
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const id = createTestId();

    await expect(handler.execute(accessContext, { id, motivo: "x" })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw BadRequestException when findConflicting returns conflicts", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.findConflicting.mockResolvedValue([
      {
        id: createTestId(),
        identificadorExterno: "ext-1",
        recurso: "turma",
        recursoId: createTestId(),
      },
    ]);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = { id: domain.id, turmas: [{ id: createTestId() }] };

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
  });

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after update", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: domain.id, motivo: "x" })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw BadRequestException when horario falls outside a recognized turno's window", async () => {
    const turmaId = createTestId();
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

    const turmaFindOneHandler = createMockTurmaFindOneHandler();
    turmaFindOneHandler.execute.mockResolvedValue({
      id: turmaId,
      nome: "Turma A",
      periodo: "Matutino",
    });

    const { handler } = createHandler({ repository, turmaFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto = {
      id: domain.id,
      turmas: [{ id: turmaId }],
      horarioInicio: "19:00:00",
      horarioFim: "20:00:00",
    };

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
  });

  it("should pass silently when periodo does not match any known turno pattern", async () => {
    const turmaId = createTestId();
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

    const turmaFindOneHandler = createMockTurmaFindOneHandler();
    turmaFindOneHandler.execute.mockResolvedValue({
      id: turmaId,
      nome: "Turma B",
      periodo: "Turno Especial XYZ",
    });

    const { handler } = createHandler({ repository, turmaFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto = {
      id: domain.id,
      turmas: [{ id: turmaId }],
      horarioInicio: "19:00:00",
      horarioFim: "20:00:00",
    };

    await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
  });

  it("should pass when horario falls inside the recognized turno's window", async () => {
    const turmaId = createTestId();
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

    const turmaFindOneHandler = createMockTurmaFindOneHandler();
    turmaFindOneHandler.execute.mockResolvedValue({
      id: turmaId,
      nome: "Turma C",
      periodo: "Noturno",
    });

    const { handler } = createHandler({ repository, turmaFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto = {
      id: domain.id,
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
      const domain = createActiveDomain();
      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

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
        id: domain.id,
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
    });

    it("should pass when sum of numeroEstimadoAlunos does not exceed ambiente capacidade", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const domain = createActiveDomain();
      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

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
        id: domain.id,
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    });

    it("should skip capacidade validation silently when turma has no numeroEstimadoAlunos", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const domain = createActiveDomain();
      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

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
        id: domain.id,
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    });

    it("should skip capacidade validation silently when ambiente has no capacidade", async () => {
      const turmaId = createTestId();
      const ambienteId = createTestId();
      const domain = createActiveDomain();
      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

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
        id: domain.id,
        turmas: [{ id: turmaId }],
        ambientes: [{ id: ambienteId }],
      };

      await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    });
  });

  describe("colecao sync hook", () => {
    it("should register a sync change when the new version has a colecao", async () => {
      const colecaoId = createTestId();
      const domain = createActiveDomain();
      const expectedResult = { id: domain.id };

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, { id: domain.id, colecao: { id: colecaoId } });

      expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
        colecaoId,
        agendamentoId: expect.any(String),
        tipoOperacao: "update",
      });
    });

    it("should not register a sync change when there is no versioned change", async () => {
      const domain = createActiveDomain();
      const expectedResult = { id: domain.id };

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

      const colecaoSyncService = createMockColecaoSyncService();
      const { handler } = createHandler({ repository, colecaoSyncService });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, { id: domain.id, nome: "Só metadata" });

      expect(colecaoSyncService.registrarMudanca).not.toHaveBeenCalled();
    });
  });

  describe("escrita condicional (If-Match)", () => {
    it("should proceed when ifMatch matches the current version", async () => {
      const domain = createActiveDomain();
      const expectedResult = { id: domain.id };

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

      const { handler } = createHandler({ repository });
      const accessContext = createTestAccessContext();

      const result = await handler.execute(accessContext, {
        id: domain.id,
        motivo: "Reagendamento",
        ifMatch: String(domain.version),
      });

      expect(result).toEqual(expectedResult);
    });

    it("should reject with PreconditionFailedError (412) when ifMatch is stale", async () => {
      const domain = createActiveDomain();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

      const { handler } = createHandler({ repository });
      const accessContext = createTestAccessContext();

      await expect(
        handler.execute(accessContext, {
          id: domain.id,
          motivo: "Reagendamento",
          ifMatch: String(domain.version + 1),
        }),
      ).rejects.toThrow(PreconditionFailedError);

      expect(repository.saveNewVersion).not.toHaveBeenCalled();
    });

    it("should proceed as before (regressão) when ifMatch is not provided", async () => {
      const domain = createActiveDomain();
      const expectedResult = { id: domain.id };

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);
      repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

      const { handler } = createHandler({ repository });
      const accessContext = createTestAccessContext();

      const result = await handler.execute(accessContext, {
        id: domain.id,
        motivo: "Reagendamento",
      });

      expect(result).toEqual(expectedResult);
    });

    it("cenário de corrida real: carrega versão N, outro escreve (vira N+1), primeiro tenta escrever com N e é rejeitado com 412", async () => {
      const domain = createActiveDomain();
      const versaoLidaPeloPrimeiroCliente = String(domain.version);

      // Simula "outro escreve": o segundo cliente promoveu uma nova versão,
      // exatamente como saveNewVersion faz — fecha a versão que ambos leram.
      // O primeiro cliente, ao tentar salvar em seguida, carrega essa mesma
      // linha já fechada (loadById busca pelo id da linha, não pela mais
      // recente do identificadorExterno).
      domain.close();

      const repository = createMockAgendamentoRepository();
      repository.loadById.mockResolvedValue(domain);

      const { handler } = createHandler({ repository });
      const accessContext = createTestAccessContext();

      await expect(
        handler.execute(accessContext, {
          id: domain.id,
          motivo: "Reagendamento",
          ifMatch: versaoLidaPeloPrimeiroCliente,
        }),
      ).rejects.toThrow(PreconditionFailedError);

      expect(repository.saveNewVersion).not.toHaveBeenCalled();
    });
  });
});
