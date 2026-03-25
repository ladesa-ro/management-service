import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCqrsRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { BlocoCreateCommandHandlerImpl } from "./bloco-create.command.handler";

function createMockCampusFindOneHandler(result?: object) {
  return {
    execute: vi.fn().mockResolvedValue(result ?? { id: createTestId() }),
  };
}

describe("BlocoCreateCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      permissionChecker?: object;
      campusFindOneHandler?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const campusFindOneHandler = overrides.campusFindOneHandler ?? createMockCampusFindOneHandler();

    const handler = new BlocoCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      campusFindOneHandler as any,
    );

    return { handler, repository, permissionChecker, campusFindOneHandler };
  }

  const campusId = createTestId();

  const dto = {
    nome: "Bloco A",
    codigo: "BLA",
    campus: { id: campusId },
  };

  it("should create bloco and return result from repository", async () => {
    const expectedResult = { id: createTestId(), nome: "Bloco A" };

    const repository = createMockCqrsRepository();
    repository.save.mockResolvedValue(undefined);
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.save).toHaveBeenCalledOnce();
    expect(repository.getFindOneQueryResult).toHaveBeenCalled();
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockCqrsRepository();
    repository.save.mockResolvedValue(undefined);
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
    const repository = createMockCqrsRepository();
    repository.save.mockResolvedValue(undefined);
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(ResourceNotFoundError);
  });
});
