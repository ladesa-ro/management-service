import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestDatedFields,
  createTestId,
} from "@/test/helpers";
import { ModalidadeUpdateCommandHandlerImpl } from "./modalidade-update.command.handler";

describe("ModalidadeUpdateCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockCrudRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new ModalidadeUpdateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  const existingEntity = {
    id: createTestId(),
    nome: "Presencial",
    slug: "presencial",
    ...createTestDatedFields(),
  };

  it("should update entity and return refreshed result", async () => {
    const updatedResult = { ...existingEntity, nome: "Semi-Presencial" };

    const repository = createMockCrudRepository();
    repository.findById
      .mockResolvedValueOnce(existingEntity) // first call: load current
      .mockResolvedValueOnce(updatedResult); // second call: return updated

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, {
      id: existingEntity.id,
      nome: "Semi-Presencial",
    });

    expect(result.nome).toBe("Semi-Presencial");
    expect(repository.update).toHaveBeenCalledOnce();
  });

  it("should throw ResourceNotFoundError when entity does not exist", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { id: createTestId(), nome: "New" }),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should call permissionChecker.ensureCanUpdate", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(existingEntity);

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();
    const dto = { id: existingEntity.id, nome: "Updated" };

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanUpdate).toHaveBeenCalledWith(
      accessContext,
      { dto },
      existingEntity.id,
    );
  });
});
