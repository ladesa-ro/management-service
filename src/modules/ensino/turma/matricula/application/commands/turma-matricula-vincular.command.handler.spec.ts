import { describe, expect, it, vi } from "vitest";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { TurmaMatriculaVincularCommandHandlerImpl } from "./turma-matricula-vincular.command.handler";

function createMockTurmaFindOneHandler(overrides: Partial<{ execute: unknown }> = {}) {
  return {
    execute: vi.fn().mockResolvedValue({ id: createTestId() }),
    ...overrides,
  };
}

function createMockPerfilRepository(overrides: Record<string, unknown> = {}) {
  return {
    getFindOneQueryResult: vi.fn().mockResolvedValue({ id: createTestId() }),
    ...overrides,
  };
}

describe("TurmaMatriculaVincularCommandHandlerImpl", () => {
  function createHandler(
    overrides: {
      repository?: object;
      turmaFindOneHandler?: object;
      perfilRepository?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const turmaFindOneHandler = overrides.turmaFindOneHandler ?? createMockTurmaFindOneHandler();
    const perfilRepository = overrides.perfilRepository ?? createMockPerfilRepository();

    const handler = new TurmaMatriculaVincularCommandHandlerImpl(
      repository as any,
      turmaFindOneHandler as any,
      perfilRepository as any,
    );

    return { handler, repository, turmaFindOneHandler, perfilRepository };
  }

  it("should vincular a perfil to a turma when there is no active matricula yet", async () => {
    const turmaId = createTestId();
    const perfilId = createTestId();

    const repository = createMockCqrsRepository();
    (repository as any).existsActiveByTurmaAndPerfil = vi.fn().mockResolvedValue(false);
    repository.getFindOneQueryResult.mockResolvedValue({
      id: createTestId(),
      turma: { id: turmaId },
      perfil: { id: perfilId },
      dateCreated: "2026-01-01T00:00:00.000Z",
      dateUpdated: "2026-01-01T00:00:00.000Z",
      dateDeleted: null,
    });

    const { handler } = createHandler({ repository });

    const result = await handler.execute(createTestAccessContext(), { turmaId, perfilId } as any);

    expect(repository.save).toHaveBeenCalledOnce();
    expect(result.turma.id).toBe(turmaId);
    expect(result.perfil.id).toBe(perfilId);
  });

  it("should reject when there is already an active matricula for the same turma and perfil", async () => {
    const turmaId = createTestId();
    const perfilId = createTestId();

    const repository = createMockCqrsRepository();
    (repository as any).existsActiveByTurmaAndPerfil = vi.fn().mockResolvedValue(true);

    const { handler } = createHandler({ repository });

    await expect(
      handler.execute(createTestAccessContext(), { turmaId, perfilId } as any),
    ).rejects.toThrow();

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should throw when turma does not exist", async () => {
    const turmaFindOneHandler = createMockTurmaFindOneHandler({
      execute: vi.fn().mockResolvedValue(null),
    });

    const { handler } = createHandler({ turmaFindOneHandler });

    await expect(
      handler.execute(createTestAccessContext(), {
        turmaId: createTestId(),
        perfilId: createTestId(),
      } as any),
    ).rejects.toThrow();
  });

  it("should throw when perfil does not exist", async () => {
    const perfilRepository = createMockPerfilRepository({
      getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    });

    const { handler } = createHandler({ perfilRepository });

    await expect(
      handler.execute(createTestAccessContext(), {
        turmaId: createTestId(),
        perfilId: createTestId(),
      } as any),
    ).rejects.toThrow();
  });
});
