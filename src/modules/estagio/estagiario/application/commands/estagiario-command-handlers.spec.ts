import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError, ValidationError } from "@/application/errors/application.error";
import {
  createMockCqrsRepository,
  createTestAccessContext,
  createTestDomainEntity,
  createTestId,
} from "@/test/helpers";
import { EstagiarioBatchCreateCommandHandlerImpl } from "./estagiario-batch-create.command.handler";
import { EstagiarioCreateCommandHandlerImpl } from "./estagiario-create.command.handler";
import { EstagiarioDeleteCommandHandlerImpl } from "./estagiario-delete.command.handler";
import { EstagiarioUpdateCommandHandlerImpl } from "./estagiario-update.command.handler";

function createValidCreateDto() {
  return {
    perfil: { id: createTestId() },
    curso: { id: createTestId() },
    turma: { id: createTestId() },
    telefone: "69999999999",
    emailInstitucional: "aluno@ifro.edu.br",
    dataNascimento: "2000-01-15",
  };
}

describe("EstagiarioCreateCommandHandler", () => {
  it("should create estagiario and return query result", async () => {
    const repository = createMockCqrsRepository();
    const savedResult = { id: createTestId(), telefone: "69999999999" };
    repository.getFindOneQueryResult.mockResolvedValue(savedResult);

    const handler = new EstagiarioCreateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), createValidCreateDto() as any);

    expect(result).toEqual(savedResult);
    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw if created entity not found", async () => {
    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new EstagiarioCreateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), createValidCreateDto() as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EstagiarioUpdateCommandHandler", () => {
  it("should verify existence, update, and return result", async () => {
    const id = createTestId();
    const repository = createMockCqrsRepository();
    const domain = createTestDomainEntity({ id, telefone: "69999999999" });
    const updated = { id, telefone: "69888888888" };
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(updated);

    const handler = new EstagiarioUpdateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), {
      id,
      telefone: "69888888888",
    } as any);

    expect(result).toEqual(updated);
    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw if entity not found", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new EstagiarioUpdateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EstagiarioDeleteCommandHandler", () => {
  it("should verify existence and soft delete", async () => {
    const id = createTestId();
    const repository = createMockCqrsRepository();
    const domain = createTestDomainEntity({ id });
    repository.loadById.mockResolvedValue(domain);

    const handler = new EstagiarioDeleteCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), { id } as any);

    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should throw if entity not found", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new EstagiarioDeleteCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EstagiarioBatchCreateCommandHandler", () => {
  it("should create usuario and estagiario for each item", async () => {
    const usuarioCreateHandler = {
      execute: vi.fn().mockResolvedValue({ vinculos: [{ id: createTestId() }] }),
    };
    const estagiarioCreateHandler = {
      execute: vi.fn().mockResolvedValue({ id: createTestId() }),
    };

    const handler = new EstagiarioBatchCreateCommandHandlerImpl(
      usuarioCreateHandler as any,
      estagiarioCreateHandler as any,
    );

    const result = await handler.execute(createTestAccessContext(), {
      estagiarios: [
        {
          usuario: {
            nome: "Aluno 1",
            matricula: "20260001",
            email: "aluno1@ifro.edu.br",
            vinculos: [{ campus: { id: createTestId() }, cargo: "ESTAGIARIO" }],
          },
          curso: { id: createTestId() },
          turma: { id: createTestId() },
          telefone: "69999999999",
          emailInstitucional: "aluno1@ifro.edu.br",
          dataNascimento: "2001-01-01",
        },
      ],
    } as any);

    expect(result).toHaveLength(1);
    expect(usuarioCreateHandler.execute).toHaveBeenCalledOnce();
    expect(estagiarioCreateHandler.execute).toHaveBeenCalledOnce();
  });

  it("should throw validation error when usuario vinculos is empty", async () => {
    const handler = new EstagiarioBatchCreateCommandHandlerImpl(
      { execute: vi.fn() } as any,
      { execute: vi.fn() } as any,
    );

    await expect(
      handler.execute(createTestAccessContext(), {
        estagiarios: [
          {
            usuario: { vinculos: [] },
            curso: { id: createTestId() },
            turma: { id: createTestId() },
            telefone: "69999999999",
            emailInstitucional: "aluno@ifro.edu.br",
            dataNascimento: "2000-01-15",
          },
        ],
      } as any),
    ).rejects.toThrow(ValidationError);
  });
});
