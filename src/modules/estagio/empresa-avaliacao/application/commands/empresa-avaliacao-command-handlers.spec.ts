import { describe, expect, it, vi } from "vitest";
import {
  ConflictError,
  ForbiddenError,
  ResourceNotFoundError,
  UnauthorizedError,
} from "@/application/errors";
import { createTestAccessContext, createTestDomainEntity, createTestId } from "@/test/helpers";
import { EmpresaAvaliacaoCreateCommandHandlerImpl } from "./empresa-avaliacao-create.command.handler";
import { EmpresaAvaliacaoDeleteCommandHandlerImpl } from "./empresa-avaliacao-delete.command.handler";
import { EmpresaAvaliacaoLikeCommandHandlerImpl } from "./empresa-avaliacao-like.command.handler";
import { EmpresaAvaliacaoUnlikeCommandHandlerImpl } from "./empresa-avaliacao-unlike.command.handler";
import { EmpresaAvaliacaoUpdateCommandHandlerImpl } from "./empresa-avaliacao-update.command.handler";

function createMockAvaliacaoRepo() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    findActiveByEmpresaAndEstagiario: vi.fn().mockResolvedValue(null),
    findAllActiveByEmpresa: vi.fn().mockResolvedValue([]),
    checkInternshipEligibility: vi
      .fn()
      .mockResolvedValue({ eligible: true, estagiarioId: createTestId() }),
    findActiveLike: vi.fn().mockResolvedValue(null),
    findAnyLike: vi.fn().mockResolvedValue(null),
    saveLike: vi.fn().mockResolvedValue(undefined),
    countActiveLikes: vi.fn().mockResolvedValue(0),
    isLikedByUser: vi.fn().mockResolvedValue(false),
    saveHistorico: vi.fn().mockResolvedValue(undefined),
    findHistoricoByAvaliacaoId: vi.fn().mockResolvedValue([]),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindMyQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { totalItems: 0 }, data: [] }),
  };
}

function createMockScoreRepo() {
  return {
    loadByEmpresaId: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    saveScoreHistorico: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
  };
}

describe("EmpresaAvaliacaoCreateCommandHandler", () => {
  it("should throw UnauthorizedError when user is not authenticated", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    const handler = new EmpresaAvaliacaoCreateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );

    await expect(handler.execute(null, { empresaId: createTestId(), rating: 5 })).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("should throw ForbiddenError when user has no internship with the company", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    avaliacaoRepo.checkInternshipEligibility.mockResolvedValue({
      eligible: false,
      reason: "Estagiário não possui histórico de estágio na empresa informada.",
    });

    const handler = new EmpresaAvaliacaoCreateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { empresaId: createTestId(), rating: 5 }),
    ).rejects.toThrow(ForbiddenError);
  });

  it("should throw ConflictError when user already has an active review for this company", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    const estagiarioId = createTestId();
    avaliacaoRepo.checkInternshipEligibility.mockResolvedValue({ eligible: true, estagiarioId });
    avaliacaoRepo.findActiveByEmpresaAndEstagiario.mockResolvedValue({ id: createTestId() });

    const handler = new EmpresaAvaliacaoCreateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { empresaId: createTestId(), rating: 5 }),
    ).rejects.toThrow(ConflictError);
  });

  it("should successfully create review, save history, recalculate score, and return result", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    const estagiarioId = createTestId();
    const empresaId = createTestId();

    avaliacaoRepo.checkInternshipEligibility.mockResolvedValue({ eligible: true, estagiarioId });
    avaliacaoRepo.findActiveByEmpresaAndEstagiario.mockResolvedValue(null);
    avaliacaoRepo.findAllActiveByEmpresa.mockResolvedValue([
      { rating: 5, dateCreated: new Date().toISOString() },
    ]);

    const createdResult = {
      id: createTestId(),
      empresaId,
      estagiarioId,
      rating: 5,
      comentario: "Excelente experiência!",
      relevanceScore: 5.0,
      likesCount: 0,
    };
    avaliacaoRepo.getFindOneQueryResult.mockResolvedValue(createdResult);

    const handler = new EmpresaAvaliacaoCreateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, {
      empresaId,
      rating: 5,
      comentario: "Excelente experiência!",
    });

    expect(result).toEqual(createdResult);
    expect(avaliacaoRepo.save).toHaveBeenCalled();
    expect(avaliacaoRepo.saveHistorico).toHaveBeenCalledWith(
      expect.objectContaining({
        acao: "CRIACAO",
        ratingNovo: 5,
        ratingAnterior: null,
      }),
    );
    expect(scoreRepo.save).toHaveBeenCalled();
    expect(scoreRepo.saveScoreHistorico).toHaveBeenCalled();
  });
});

describe("EmpresaAvaliacaoUpdateCommandHandler", () => {
  it("should throw ResourceNotFoundError if review does not exist", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    avaliacaoRepo.loadById.mockResolvedValue(null);

    const handler = new EmpresaAvaliacaoUpdateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId(), rating: 4 })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw ForbiddenError if non-superuser user is not the author", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    const id = createTestId();

    avaliacaoRepo.loadById.mockResolvedValue(
      createTestDomainEntity({ id, empresa: { id: createTestId() } }),
    );
    avaliacaoRepo.getFindOneQueryResult.mockResolvedValue({
      id,
      autor: { id: "other-user-id" },
    });

    const handler = new EmpresaAvaliacaoUpdateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );
    const accessContext = createTestAccessContext(); // actor.id != "other-user-id"

    await expect(handler.execute(accessContext, { id, rating: 4 })).rejects.toThrow(ForbiddenError);
  });

  it("should allow author to update rating and comment and save history", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    const id = createTestId();
    const accessContext = createTestAccessContext();
    const userId = accessContext.requestActor!.id;
    const empresaId = createTestId();

    const domainEntity = createTestDomainEntity({
      id,
      empresa: { id: empresaId },
      rating: 3,
      comentario: "Antigo",
      recalculateRelevance: vi.fn(),
      update: vi.fn().mockImplementation(function (this: any, data: any) {
        if (data.rating !== undefined) this.rating = data.rating;
        if (data.comentario !== undefined) this.comentario = data.comentario;
      }),
    });
    avaliacaoRepo.loadById.mockResolvedValue(domainEntity);
    avaliacaoRepo.getFindOneQueryResult.mockResolvedValue({
      id,
      autor: { id: userId },
      rating: 5,
      comentario: "Novo comentário",
    });

    const handler = new EmpresaAvaliacaoUpdateCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );

    const result = await handler.execute(accessContext, {
      id,
      rating: 5,
      comentario: "Novo comentário",
    });

    expect(result.rating).toBe(5);
    expect(domainEntity.update).toHaveBeenCalled();
    expect(avaliacaoRepo.save).toHaveBeenCalled();
    expect(avaliacaoRepo.saveHistorico).toHaveBeenCalledWith(
      expect.objectContaining({
        acao: "EDICAO",
        ratingAnterior: 3,
        ratingNovo: 5,
      }),
    );
  });
});

describe("EmpresaAvaliacaoDeleteCommandHandler", () => {
  it("should allow author to soft-delete review and log REMOCAO in history", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const scoreRepo = createMockScoreRepo();
    const id = createTestId();
    const accessContext = createTestAccessContext();
    const userId = accessContext.requestActor!.id;

    const domainEntity = createTestDomainEntity({
      id,
      empresa: { id: createTestId() },
      rating: 4,
      softDelete: vi.fn(),
    });
    avaliacaoRepo.loadById.mockResolvedValue(domainEntity);
    avaliacaoRepo.getFindOneQueryResult.mockResolvedValue({
      id,
      autor: { id: userId },
    });

    const handler = new EmpresaAvaliacaoDeleteCommandHandlerImpl(
      avaliacaoRepo as any,
      scoreRepo as any,
    );
    const result = await handler.execute(accessContext, { id });

    expect(result).toBe(true);
    expect(domainEntity.softDelete).toHaveBeenCalled();
    expect(avaliacaoRepo.saveHistorico).toHaveBeenCalledWith(
      expect.objectContaining({
        acao: "REMOCAO",
      }),
    );
  });
});

describe("EmpresaAvaliacaoLikeCommandHandler & Unlike", () => {
  it("should allow user to like a review and increment count", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const avaliacaoId = createTestId();
    const accessContext = createTestAccessContext();

    const domainEntity = createTestDomainEntity({
      id: avaliacaoId,
      likesCount: 1,
      relevanceScore: 5.0,
      updateLikesCount: vi.fn(),
    });
    avaliacaoRepo.loadById.mockResolvedValue(domainEntity);
    avaliacaoRepo.findActiveLike.mockResolvedValue(null);
    avaliacaoRepo.countActiveLikes.mockResolvedValue(1);

    const handler = new EmpresaAvaliacaoLikeCommandHandlerImpl(avaliacaoRepo as any);
    const result = await handler.execute(accessContext, { avaliacaoId });

    expect(result.isLikedByCurrentUser).toBe(true);
    expect(avaliacaoRepo.saveLike).toHaveBeenCalled();
    expect(domainEntity.updateLikesCount).toHaveBeenCalledWith(1);
  });

  it("should prevent duplicate likes by throwing ConflictError", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const avaliacaoId = createTestId();
    const accessContext = createTestAccessContext();

    avaliacaoRepo.loadById.mockResolvedValue(createTestDomainEntity({ id: avaliacaoId }));
    avaliacaoRepo.findActiveLike.mockResolvedValue({ id: createTestId() });

    const handler = new EmpresaAvaliacaoLikeCommandHandlerImpl(avaliacaoRepo as any);

    await expect(handler.execute(accessContext, { avaliacaoId })).rejects.toThrow(ConflictError);
  });

  it("should allow user to unlike a review", async () => {
    const avaliacaoRepo = createMockAvaliacaoRepo();
    const avaliacaoId = createTestId();
    const accessContext = createTestAccessContext();

    const domainEntity = createTestDomainEntity({
      id: avaliacaoId,
      likesCount: 0,
      relevanceScore: 3.0,
      updateLikesCount: vi.fn(),
    });
    const activeLike = {
      id: createTestId(),
      softDelete: vi.fn(),
    };

    avaliacaoRepo.loadById.mockResolvedValue(domainEntity);
    avaliacaoRepo.findActiveLike.mockResolvedValue(activeLike);
    avaliacaoRepo.countActiveLikes.mockResolvedValue(0);

    const handler = new EmpresaAvaliacaoUnlikeCommandHandlerImpl(avaliacaoRepo as any);
    const result = await handler.execute(accessContext, { avaliacaoId });

    expect(result.isLikedByCurrentUser).toBe(false);
    expect(activeLike.softDelete).toHaveBeenCalled();
    expect(domainEntity.updateLikesCount).toHaveBeenCalledWith(0);
  });
});
