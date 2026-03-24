import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { OfertaFormacaoFindOneQueryHandlerImpl } from "./oferta-formacao-find-one.query.handler";
import { OfertaFormacaoListQueryHandlerImpl } from "./oferta-formacao-list.query.handler";

function createMockOfertaFormacaoRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
  };
}

describe("OfertaFormacaoFindOneQueryHandler", () => {
  it("should delegate to repository.getFindOneQueryResult", async () => {
    const id = createTestId();
    const expected = { id, nome: "Técnico em Informática" };

    const repository = createMockOfertaFormacaoRepository();
    repository.getFindOneQueryResult.mockResolvedValue(expected);

    const handler = new OfertaFormacaoFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(expected);
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockOfertaFormacaoRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new OfertaFormacaoFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });

  it("should pass null accessContext to repository", async () => {
    const id = createTestId();
    const repository = createMockOfertaFormacaoRepository();

    const handler = new OfertaFormacaoFindOneQueryHandlerImpl(repository as any);

    await handler.execute(null, { id });

    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(null, { id });
  });
});

describe("OfertaFormacaoListQueryHandler", () => {
  it("should delegate to repository.getFindAllQueryResult", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockOfertaFormacaoRepository();
    repository.getFindAllQueryResult.mockResolvedValue(expected);

    const handler = new OfertaFormacaoListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(accessContext, null);
  });

  it("should pass dto to repository", async () => {
    const dto = { page: 2, limit: 10 };
    const repository = createMockOfertaFormacaoRepository();

    const handler = new OfertaFormacaoListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, dto as any);

    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(accessContext, dto);
  });
});
