import { describe, expect, it, vi } from "vitest";
import {
  createMockCqrsRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestDomainEntity,
  createTestId,
} from "@/test/helpers";
import { CalendarioIndisponibilidadeAmbienteDeleteCommandHandlerImpl } from "./calendario-indisponibilidade-ambiente-delete.command.handler";

function createRepository() {
  return {
    ...createMockCqrsRepository(),
    findAllAtivasByAmbienteId: vi.fn().mockResolvedValue([]),
  };
}

describe("CalendarioIndisponibilidadeAmbienteDeleteCommandHandlerImpl", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CalendarioIndisponibilidadeAmbienteDeleteCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  it("should soft-delete an existing active entity and return true", async () => {
    const id = createTestId();
    const entity = createTestDomainEntity({ id });

    const repository = createRepository();
    repository.loadById.mockResolvedValue(entity);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id } as any);

    expect(result).toBe(true);
    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should call permissionChecker.ensureCanDelete before deleting", async () => {
    const id = createTestId();
    const entity = createTestDomainEntity({ id });

    const repository = createRepository();
    repository.loadById.mockResolvedValue(entity);

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, { id } as any);

    expect(permissionChecker.ensureCanDelete).toHaveBeenCalledWith(
      accessContext,
      { dto: { id } },
      id,
    );
  });

  it("should throw when the entity does not exist", async () => {
    const repository = createRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId() } as any)).rejects.toThrow();
  });

  it("should throw when the entity is already inactive (soft-deleted)", async () => {
    const id = createTestId();
    const entity = createTestDomainEntity({ id, isActive: () => false });

    const repository = createRepository();
    repository.loadById.mockResolvedValue(entity);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id } as any)).rejects.toThrow();
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanDelete.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId() } as any)).rejects.toThrow(
      "Forbidden",
    );
  });
});
