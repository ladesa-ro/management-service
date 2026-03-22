import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { ModalidadeCreateCommandHandlerImpl } from "./modalidade-create.command.handler";

describe("ModalidadeCreateCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockCrudRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new ModalidadeCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  it("should create modalidade and return result from repository", async () => {
    const id = createTestId();
    const expectedResult = { id, nome: "Presencial", slug: "presencial" };

    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id });
    repository.findById.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = { nome: "Presencial", slug: "presencial" };

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
    const dto = { nome: "Test", slug: "test" };

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(accessContext, { dto });
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanCreate.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { nome: "X", slug: "x" })).rejects.toThrow(
      "Forbidden",
    );
  });

  it("should throw ResourceNotFoundError when findById returns null after create", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.findById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { nome: "Test", slug: "test" })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
