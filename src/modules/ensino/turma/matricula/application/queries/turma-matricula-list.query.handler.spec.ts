import { describe, expect, it } from "vitest";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { TurmaMatriculaListQueryHandlerImpl } from "./turma-matricula-list.query.handler";

describe("TurmaMatriculaListQueryHandlerImpl", () => {
  function createHandler(overrides: { repository?: object } = {}) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const handler = new TurmaMatriculaListQueryHandlerImpl(repository as any);
    return { handler, repository };
  }

  it("should list matriculas filtered by turma (alunos da turma)", async () => {
    const turmaId = createTestId();

    const repository = createMockCqrsRepository();
    repository.getFindAllQueryResult.mockResolvedValue({
      meta: { itemCount: 1 },
      data: [{ id: createTestId(), turma: { id: turmaId }, perfil: { id: createTestId() } }],
    });

    const { handler } = createHandler({ repository });

    const query = { "filter.turma.id": [turmaId] } as any;
    const result = await handler.execute(createTestAccessContext(), query);

    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(expect.anything(), query);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].turma.id).toBe(turmaId);
  });

  it("should list matriculas filtered by perfil (turmas do aluno)", async () => {
    const perfilId = createTestId();

    const repository = createMockCqrsRepository();
    repository.getFindAllQueryResult.mockResolvedValue({
      meta: { itemCount: 1 },
      data: [{ id: createTestId(), turma: { id: createTestId() }, perfil: { id: perfilId } }],
    });

    const { handler } = createHandler({ repository });

    const query = { "filter.perfil.id": [perfilId] } as any;
    const result = await handler.execute(createTestAccessContext(), query);

    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(expect.anything(), query);
    expect(result.data[0].perfil.id).toBe(perfilId);
  });
});
