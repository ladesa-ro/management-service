import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import { createMockPermissionChecker, createTestAccessContext, createTestId } from "@/test/helpers";
import { CampusDeleteCommandHandlerImpl } from "./campus-delete.command.handler";

function createMockCampusRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
  };
}

describe("CampusDeleteCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockCampusRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CampusDeleteCommandHandlerImpl(repository as any, permissionChecker as any);

    return { handler, repository, permissionChecker };
  }

  it("should delete an existing entity and return true", async () => {
    const id = createTestId();
    const aggregate = { id, nomeFantasia: "Campus Central" };

    const repository = createMockCampusRepository();
    repository.loadById.mockResolvedValue(aggregate);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toBe(true);
    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should call permissionChecker.ensureCanDelete", async () => {
    const id = createTestId();
    const repository = createMockCampusRepository();
    repository.loadById.mockResolvedValue({ id });

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
    const repository = createMockCampusRepository();
    repository.loadById.mockResolvedValue(null);

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
