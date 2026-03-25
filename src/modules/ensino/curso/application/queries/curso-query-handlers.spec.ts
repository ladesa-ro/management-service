import { describe, expect, it } from "vitest";
import { createMockCrudRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { CursoFindOneQueryHandlerImpl } from "./curso-find-one.query.handler";
import { CursoListQueryHandlerImpl } from "./curso-list.query.handler";

describe("CursoFindOneQueryHandler", () => {
  it("should delegate to repository.getFindOneQueryResult", async () => {
    const id = createTestId();
    const entity = { id, nome: "Engenharia de Software" };

    const repository = createMockCrudRepository();
    repository.getFindOneQueryResult.mockResolvedValue(entity);

    const handler = new CursoFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(entity);
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockCrudRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new CursoFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });
});

describe("CursoListQueryHandler", () => {
  it("should delegate to repository.getFindAllQueryResult", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockCrudRepository();
    repository.getFindAllQueryResult.mockResolvedValue(expected);

    const handler = new CursoListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(accessContext, null);
  });
});
