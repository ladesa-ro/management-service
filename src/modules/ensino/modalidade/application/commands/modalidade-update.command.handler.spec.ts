import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCqrsRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestDomainEntity,
  createTestId,
} from "@/test/helpers";

import { ModalidadeUpdateCommandHandlerImpl } from "./modalidade-update.command.handler";

describe("ModalidadeUpdateCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new ModalidadeUpdateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  const existingEntity = createTestDomainEntity({
    nome: "Presencial",
    slug: "presencial",
  });

  it("should update entity and return refreshed result", async () => {
    const updatedResult = { ...existingEntity, nome: "Semi-Presencial" };

    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(existingEntity);
    repository.getFindOneQueryResult.mockResolvedValue(updatedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, {
      id: existingEntity.id,
      nome: "Semi-Presencial",
    });

    expect(result.nome).toBe("Semi-Presencial");
    expect(repository.save).toHaveBeenCalledOnce();
  });

  it("should throw ResourceNotFoundError when entity does not exist", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { id: createTestId(), nome: "New" }),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should call permissionChecker.ensureCanUpdate", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(existingEntity);
    repository.getFindOneQueryResult.mockResolvedValue(existingEntity);

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
