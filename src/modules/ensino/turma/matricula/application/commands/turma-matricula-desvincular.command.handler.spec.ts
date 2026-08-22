import { describe, expect, it } from "vitest";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { TurmaMatricula } from "../../domain/turma-matricula";
import { TurmaMatriculaDesvincularCommandHandlerImpl } from "./turma-matricula-desvincular.command.handler";

function createActiveMatricula() {
  return TurmaMatricula.create({
    turma: { id: createTestId() },
    perfil: { id: createTestId() },
  });
}

describe("TurmaMatriculaDesvincularCommandHandlerImpl", () => {
  function createHandler(overrides: { repository?: object } = {}) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const handler = new TurmaMatriculaDesvincularCommandHandlerImpl(repository as any);
    return { handler, repository };
  }

  it("should soft-delete an active matricula", async () => {
    const matricula = createActiveMatricula();

    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(matricula);

    const { handler } = createHandler({ repository });

    const result = await handler.execute(createTestAccessContext(), { id: matricula.id } as any);

    expect(result).toBe(true);
    expect(repository.softDeleteById).toHaveBeenCalledWith(matricula.id);
  });

  it("should throw when matricula does not exist", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow();
  });

  it("should throw when matricula is already inactive", async () => {
    const matricula = createActiveMatricula();
    matricula.dateDeleted = "2026-01-01T00:00:00.000Z";

    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(matricula);

    const { handler } = createHandler({ repository });

    await expect(
      handler.execute(createTestAccessContext(), { id: matricula.id } as any),
    ).rejects.toThrow();

    expect(repository.softDeleteById).not.toHaveBeenCalled();
  });
});
