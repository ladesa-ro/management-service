import { describe, expect, it } from "vitest";
import { createMockCrudRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { BlocoFindOneQueryHandlerImpl } from "./bloco-find-one.query.handler";
import { BlocoListQueryHandlerImpl } from "./bloco-list.query.handler";

describe("BlocoFindOneQueryHandler", () => {
  it("should delegate to repository.findById", async () => {
    const id = createTestId();
    const entity = { id, nome: "Bloco A", codigo: "BLA" };

    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(entity);

    const handler = new BlocoFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(entity);
    expect(repository.findById).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new BlocoFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });
});

describe("BlocoListQueryHandler", () => {
  it("should delegate to repository.findAll", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockCrudRepository();
    repository.findAll.mockResolvedValue(expected);

    const handler = new BlocoListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.findAll).toHaveBeenCalledWith(accessContext, null);
  });
});
