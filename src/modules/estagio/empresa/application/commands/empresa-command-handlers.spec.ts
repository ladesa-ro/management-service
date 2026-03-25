import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import {
  createMockCqrsRepository,
  createTestAccessContext,
  createTestDomainEntity,
  createTestId,
} from "@/test/helpers";
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
    const repository = createMockCqrsRepository();
    const savedResult = { id: createTestId(), nomeFantasia: "Empresa Teste" };
    repository.getFindOneQueryResult.mockResolvedValue(savedResult);

    const handler = new EmpresaCreateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), createValidCreateDto() as any);

    expect(result).toEqual(savedResult);
    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw if created entity not found after create", async () => {
    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new EmpresaCreateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), createValidCreateDto() as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EmpresaUpdateCommandHandler", () => {
  it("should verify existence, update, and return result", async () => {
    const id = createTestId();
    const repository = createMockCqrsRepository();
    const domain = createTestDomainEntity({ id, nomeFantasia: "Old" });
    const updated = { id, nomeFantasia: "New" };
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(updated);

    const handler = new EmpresaUpdateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), {
      id,
      nomeFantasia: "New",
    } as any);

    expect(result).toEqual(updated);
    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw if entity not found", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new EmpresaUpdateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EmpresaDeleteCommandHandler", () => {
  it("should verify existence and soft delete", async () => {
    const id = createTestId();
    const repository = createMockCqrsRepository();
    const domain = createTestDomainEntity({ id });
    repository.loadById.mockResolvedValue(domain);

    const handler = new EmpresaDeleteCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), { id } as any);

    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should throw if entity not found", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new EmpresaDeleteCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
