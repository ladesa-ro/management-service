import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import {
  createMockCqrsRepository,
  createTestAccessContext,
  createTestDomainEntity,
  createTestId,
} from "@/test/helpers";
import { EstagiarioCreateCommandHandlerImpl } from "./estagiario-create.command.handler";
import { EstagiarioDeleteCommandHandlerImpl } from "./estagiario-delete.command.handler";
import { EstagiarioUpdateCommandHandlerImpl } from "./estagiario-update.command.handler";

function createValidCreateDto() {
  return {
    perfil: { id: createTestId() },
    curso: { id: createTestId() },
    periodo: "2026.1",
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
