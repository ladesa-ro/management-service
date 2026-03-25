import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import { createMockPermissionChecker, createTestAccessContext, createTestId } from "@/test/helpers";
import { CampusCreateCommandHandlerImpl } from "./campus-create.command.handler";

function createMockCampusRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
  };
}

function createMockEnderecoHandler() {
  return {
    execute: vi.fn().mockResolvedValue({ id: createTestId() }),
  };
}

describe("CampusCreateCommandHandler", () => {
  function createHandler(
    overrides: { repository?: object; permissionChecker?: object; enderecoHandler?: object } = {},
  ) {
    const repository = overrides.repository ?? createMockCampusRepository();
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
    const expectedResult = { id: createTestId(), nomeFantasia: "Campus Central" };

    const repository = createMockCampusRepository();
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.save).toHaveBeenCalledOnce();
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockCampusRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

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

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after save", async () => {
    const repository = createMockCampusRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(ResourceNotFoundError);
  });
});
