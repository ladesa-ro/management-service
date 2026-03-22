import { describe, expect, it } from "vitest";
import { createMockCrudRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { ModalidadeFindOneQueryHandlerImpl } from "./modalidade-find-one.query.handler";
import { ModalidadeListQueryHandlerImpl } from "./modalidade-list.query.handler";

describe("ModalidadeFindOneQueryHandler", () => {
  it("should delegate to repository.findById", async () => {
    const id = createTestId();
    const entity = { id, nome: "Presencial", slug: "presencial" };

    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(entity);

    const handler = new ModalidadeFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(entity);
    expect(repository.findById).toHaveBeenCalledWith(accessContext, { id }, undefined);
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockCrudRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new ModalidadeFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });
});

describe("ModalidadeListQueryHandler", () => {
  it("should delegate to repository.findAll", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockCrudRepository();
    repository.findAll.mockResolvedValue(expected);

    const handler = new ModalidadeListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.findAll).toHaveBeenCalledWith(accessContext, null, undefined);
  });
});
