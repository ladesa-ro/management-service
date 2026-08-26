import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { EmpresaAvaliacaoFindMyQueryHandlerImpl } from "./empresa-avaliacao-find-my.query.handler";
import { EmpresaAvaliacaoFindOneQueryHandlerImpl } from "./empresa-avaliacao-find-one.query.handler";
import { EmpresaAvaliacaoHistoricoListQueryHandlerImpl } from "./empresa-avaliacao-historico-list.query.handler";
import { EmpresaAvaliacaoListQueryHandlerImpl } from "./empresa-avaliacao-list.query.handler";
import { EmpresaScoreFindOneQueryHandlerImpl } from "./empresa-score-find-one.query.handler";

describe("EmpresaAvaliacaoQueryHandlers", () => {
  it("EmpresaAvaliacaoFindOneQueryHandler should return review or throw ResourceNotFoundError", async () => {
    const repository = {
      getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    };
    const handler = new EmpresaAvaliacaoFindOneQueryHandlerImpl(repository as any);

    await expect(handler.execute(null, { id: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );

    const expected = { id: createTestId(), rating: 5 };
    repository.getFindOneQueryResult.mockResolvedValue(expected);
    const result = await handler.execute(null, { id: expected.id });
    expect(result).toEqual(expected);
  });

  it("EmpresaAvaliacaoListQueryHandler should call getFindAllQueryResult", async () => {
    const listResult = { meta: { totalItems: 1 }, data: [{ id: createTestId() }] };
    const repository = {
      getFindAllQueryResult: vi.fn().mockResolvedValue(listResult),
    };
    const handler = new EmpresaAvaliacaoListQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, {
      empresaId: createTestId(),
      order: "relevancia",
    });
    expect(result).toEqual(listResult);
  });

  it("EmpresaAvaliacaoFindMyQueryHandler should throw UnauthorizedError if user is not logged in", async () => {
    const repository = {
      getFindMyQueryResult: vi.fn().mockResolvedValue(null),
    };
    const handler = new EmpresaAvaliacaoFindMyQueryHandlerImpl(repository as any);

    await expect(handler.execute(null, { empresaId: createTestId() })).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("EmpresaAvaliacaoFindMyQueryHandler should return user review", async () => {
    const expected = { id: createTestId(), rating: 4 };
    const repository = {
      getFindMyQueryResult: vi.fn().mockResolvedValue(expected),
    };
    const handler = new EmpresaAvaliacaoFindMyQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { empresaId: createTestId() });
    expect(result).toEqual(expected);
  });

  it("EmpresaScoreFindOneQueryHandler should calculate and save if not existing", async () => {
    const avaliacaoRepo = {
      findAllActiveByEmpresa: vi
        .fn()
        .mockResolvedValue([{ rating: 5, dateCreated: "2026-08-26T10:00:00.000Z" }]),
    };
    const scoreRepo = {
      getFindOneQueryResult: vi.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({
        score: 68.75,
        averageRating: 5.0,
        totalReviews: 1,
      }),
      save: vi.fn().mockResolvedValue(undefined),
    };

    const handler = new EmpresaScoreFindOneQueryHandlerImpl(avaliacaoRepo as any, scoreRepo as any);
    const result = await handler.execute(null, { empresaId: createTestId() });

    expect(result.score).toBe(68.75);
    expect(scoreRepo.save).toHaveBeenCalled();
  });

  it("EmpresaAvaliacaoHistoricoListQueryHandler should return history list", async () => {
    const historicoList = [
      { id: createTestId(), acao: "CRIACAO", ratingNovo: 5, ratingAnterior: null },
    ];
    const repository = {
      findHistoricoByAvaliacaoId: vi.fn().mockResolvedValue(historicoList),
    };

    const handler = new EmpresaAvaliacaoHistoricoListQueryHandlerImpl(repository as any);
    const result = await handler.execute(null, { avaliacaoId: createTestId() });

    expect(result).toEqual(historicoList);
  });
});
