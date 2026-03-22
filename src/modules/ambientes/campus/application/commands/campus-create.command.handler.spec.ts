import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CampusCreateCommandHandlerImpl } from "./campus-create.command.handler";

function createMockEnderecoHandler() {
  return {
    execute: vi.fn().mockResolvedValue({ id: createTestId() }),
  };
}

describe("CampusCreateCommandHandler", () => {
  function createHandler(
    overrides: { repository?: object; permissionChecker?: object; enderecoHandler?: object } = {},
  ) {
    const repository = overrides.repository ?? createMockCrudRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const enderecoHandler = overrides.enderecoHandler ?? createMockEnderecoHandler();

    const handler = new CampusCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      enderecoHandler as any,
    );

    return { handler, repository, permissionChecker, enderecoHandler };
  }

  const dto = {
    nomeFantasia: "Campus Central",
    razaoSocial: "Instituto Federal",
    apelido: "Central",
    cnpj: "12345678000100",
    endereco: {
      cep: "01001000",
      logradouro: "Rua Principal",
      numero: 100,
      bairro: "Centro",
      complemento: null,
      pontoReferencia: null,
      cidade: { id: 1 },
    },
  };

  it("should create campus and return result from repository", async () => {
    const id = createTestId();
    const expectedResult = { id, nomeFantasia: "Campus Central" };

    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id });
    repository.findById.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.findById).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.findById.mockResolvedValue({ id: createTestId() });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(accessContext, { dto });
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanCreate.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow("Forbidden");
  });

  it("should throw ResourceNotFoundError when findById returns null after create", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.findById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(ResourceNotFoundError);
  });
});
