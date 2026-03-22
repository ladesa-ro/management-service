import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CursoDeleteCommandHandlerImpl } from "./curso-delete.command.handler";

describe("CursoDeleteCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockCrudRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CursoDeleteCommandHandlerImpl(repository as any, permissionChecker as any);

    return { handler, repository, permissionChecker };
  }

  it("should delete an existing entity and return true", async () => {
    const id = createTestId();
    const entity = { id, nome: "Engenharia de Software" };

    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(entity);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toBe(true);
    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should call permissionChecker.ensureCanDelete", async () => {
    const id = createTestId();
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue({ id });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, { id });

    expect(permissionChecker.ensureCanDelete).toHaveBeenCalledWith(
      accessContext,
      { dto: { id } },
      id,
    );
  });

  it("should throw ResourceNotFoundError when entity does not exist", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanDelete.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      "Forbidden",
    );
  });
});
