import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoCreateCommandHandlerImpl } from "./calendario-agendamento-create.command.handler";

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
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CalendarioAgendamentoCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
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
});
