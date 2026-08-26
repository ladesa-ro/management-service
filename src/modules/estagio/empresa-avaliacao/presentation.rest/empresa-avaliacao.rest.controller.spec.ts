import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { EmpresaAvaliacaoRestController } from "./empresa-avaliacao.rest.controller";

describe("EmpresaAvaliacaoRestController", () => {
  function createController() {
    const listHandler = { execute: vi.fn() };
    const findOneHandler = { execute: vi.fn() };
    const findMyHandler = { execute: vi.fn() };
    const createHandler = { execute: vi.fn() };
    const updateHandler = { execute: vi.fn() };
    const deleteHandler = { execute: vi.fn() };
    const likeHandler = { execute: vi.fn() };
    const unlikeHandler = { execute: vi.fn() };
    const historicoListHandler = { execute: vi.fn() };

    const controller = new EmpresaAvaliacaoRestController(
      listHandler as any,
      findOneHandler as any,
      findMyHandler as any,
      createHandler as any,
      updateHandler as any,
      deleteHandler as any,
      likeHandler as any,
      unlikeHandler as any,
      historicoListHandler as any,
    );

    return {
      controller,
      listHandler,
      findOneHandler,
      findMyHandler,
      createHandler,
      updateHandler,
      deleteHandler,
      likeHandler,
      unlikeHandler,
      historicoListHandler,
    };
  }

  it("listByEmpresa should delegate to listHandler", async () => {
    const { controller, listHandler } = createController();
    const empresaId = createTestId();
    listHandler.execute.mockResolvedValue({
      meta: { totalItems: 0, itemsPerPage: 20, totalPages: 0, currentPage: 1 },
      data: [],
    });

    const accessContext = createTestAccessContext();
    const result = await controller.listByEmpresa(accessContext, empresaId, {
      order: "relevancia",
    });

    expect(result.data).toEqual([]);
    expect(listHandler.execute).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({ empresaId, order: "relevancia" }),
    );
  });

  it("create should delegate to createHandler", async () => {
    const { controller, createHandler } = createController();
    const empresaId = createTestId();
    const created = {
      id: createTestId(),
      empresaId,
      estagiarioId: createTestId(),
      autor: { id: "user-1", nome: "Estagiário" },
      rating: 5,
      comentario: "Excelente",
      relevanceScore: 5.0,
      likesCount: 0,
    };
    createHandler.execute.mockResolvedValue(created);

    const accessContext = createTestAccessContext();
    const result = await controller.create(accessContext, empresaId, {
      rating: 5,
      comentario: "Excelente",
    });

    expect(result.rating).toBe(5);
    expect(createHandler.execute).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({ empresaId, rating: 5, comentario: "Excelente" }),
    );
  });

  it("like and unlike should delegate to likeHandler and unlikeHandler", async () => {
    const { controller, likeHandler, unlikeHandler } = createController();
    const avaliacaoId = createTestId();
    const accessContext = createTestAccessContext();

    likeHandler.execute.mockResolvedValue({
      avaliacaoId,
      likesCount: 1,
      isLikedByCurrentUser: true,
      relevanceScore: 5.0,
    });
    unlikeHandler.execute.mockResolvedValue({
      avaliacaoId,
      likesCount: 0,
      isLikedByCurrentUser: false,
      relevanceScore: 3.0,
    });

    const likeResult = await controller.like(accessContext, avaliacaoId);
    expect(likeResult.isLikedByCurrentUser).toBe(true);

    const unlikeResult = await controller.unlike(accessContext, avaliacaoId);
    expect(unlikeResult.isLikedByCurrentUser).toBe(false);
  });

  it("findHistorico should return formatted history", async () => {
    const { controller, historicoListHandler } = createController();
    const avaliacaoId = createTestId();
    const accessContext = createTestAccessContext();

    historicoListHandler.execute.mockResolvedValue([
      {
        id: createTestId(),
        avaliacaoId,
        usuarioId: "user-1",
        usuarioNome: "User",
        ratingAnterior: null,
        ratingNovo: 5,
        comentarioAnterior: null,
        comentarioNovo: "Ótimo",
        acao: "CRIACAO",
        dateCreated: "2026-08-26T12:00:00.000Z",
      },
    ]);

    const result = await controller.findHistorico(accessContext, avaliacaoId);
    expect(result.length).toBe(1);
    expect(result[0].acao).toBe("CRIACAO");
  });
});
