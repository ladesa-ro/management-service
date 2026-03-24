import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { createMockCrudRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { EmpresaCreateCommandHandlerImpl } from "./empresa-create.command.handler";
import { EmpresaDeleteCommandHandlerImpl } from "./empresa-delete.command.handler";
import { EmpresaUpdateCommandHandlerImpl } from "./empresa-update.command.handler";

function createValidCreateDto() {
  return {
    razaoSocial: "Empresa LTDA",
    nomeFantasia: "Empresa Teste",
    cnpj: "12345678000100",
    telefone: "69999999999",
    email: "contato@empresa.com",
    endereco: { id: createTestId() },
  };
}

describe("EmpresaCreateCommandHandler", () => {
  it("should create empresa and return query result", async () => {
    const repository = createMockCrudRepository();
    const savedResult = { id: createTestId(), nomeFantasia: "Empresa Teste" };
    repository.findById.mockResolvedValue(savedResult);

    const handler = new EmpresaCreateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), createValidCreateDto() as any);

    expect(result).toEqual(savedResult);
    expect(repository.create).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalled();
  });

  it("should throw if created entity not found after create", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new EmpresaCreateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), createValidCreateDto() as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EmpresaUpdateCommandHandler", () => {
  it("should verify existence, update, and return result", async () => {
    const id = createTestId();
    const repository = createMockCrudRepository();
    const existing = { id, nomeFantasia: "Old" };
    const updated = { id, nomeFantasia: "New" };
    repository.findById.mockResolvedValueOnce(existing).mockResolvedValueOnce(updated);

    const handler = new EmpresaUpdateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), {
      id,
      nomeFantasia: "New",
    } as any);

    expect(result).toEqual(updated);
    expect(repository.update).toHaveBeenCalledWith(id, { nomeFantasia: "New" });
  });

  it("should throw if entity not found", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new EmpresaUpdateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EmpresaDeleteCommandHandler", () => {
  it("should verify existence and soft delete", async () => {
    const id = createTestId();
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue({ id });

    const handler = new EmpresaDeleteCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), { id } as any);

    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should throw if entity not found", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new EmpresaDeleteCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
