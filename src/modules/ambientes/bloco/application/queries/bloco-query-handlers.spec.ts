import { describe, expect, it } from "vitest";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { BlocoFindOneQueryHandlerImpl } from "./bloco-find-one.query.handler";
import { BlocoListQueryHandlerImpl } from "./bloco-list.query.handler";

describe("BlocoFindOneQueryHandler", () => {
  it("should delegate to repository.getFindOneQueryResult", async () => {
    const id = createTestId();
    const entity = { id, nome: "Bloco A", codigo: "BLA" };

    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(entity);

    const handler = new BlocoFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(entity);
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new BlocoFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });
});

describe("BlocoListQueryHandler", () => {
  it("should delegate to repository.getFindAllQueryResult", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockCqrsRepository();
    repository.getFindAllQueryResult.mockResolvedValue(expected);

    const handler = new BlocoListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(accessContext, null);
  });
});
