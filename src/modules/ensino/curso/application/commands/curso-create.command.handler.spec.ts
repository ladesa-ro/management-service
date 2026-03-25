import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CursoCreateCommandHandlerImpl } from "./curso-create.command.handler";

function createMockFindOneHandler(result?: object) {
  return {
    execute: vi.fn().mockResolvedValue(result ?? { id: createTestId() }),
  };
}

describe("CursoCreateCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      permissionChecker?: object;
      campusFindOneHandler?: object;
      ofertaFormacaoFindOneHandler?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockCrudRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const campusFindOneHandler = overrides.campusFindOneHandler ?? createMockFindOneHandler();
    const ofertaFormacaoFindOneHandler =
      overrides.ofertaFormacaoFindOneHandler ?? createMockFindOneHandler();

    const handler = new CursoCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      campusFindOneHandler as any,
      ofertaFormacaoFindOneHandler as any,
    );

    return {
      handler,
      repository,
      permissionChecker,
      campusFindOneHandler,
      ofertaFormacaoFindOneHandler,
    };
  }

  const campusId = createTestId();
  const ofertaFormacaoId = createTestId();

  const dto = {
    nome: "Engenharia de Software",
    nomeAbreviado: "ESW",
    campus: { id: campusId },
    ofertaFormacao: { id: ofertaFormacaoId },
  };

  it("should create curso and return result from repository", async () => {
    const id = createTestId();
    const expectedResult = { id, nome: "Engenharia de Software" };

    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id });
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
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

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after create", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(ResourceNotFoundError);
  });
});
