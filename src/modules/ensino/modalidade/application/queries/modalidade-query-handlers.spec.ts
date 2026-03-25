import { describe, expect, it } from "vitest";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { ModalidadeFindOneQueryHandlerImpl } from "./modalidade-find-one.query.handler";
import { ModalidadeListQueryHandlerImpl } from "./modalidade-list.query.handler";

describe("ModalidadeFindOneQueryHandler", () => {
  it("should delegate to repository.getFindOneQueryResult", async () => {
    const id = createTestId();
    const entity = { id, nome: "Presencial", slug: "presencial" };

    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(entity);

    const handler = new ModalidadeFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(entity);
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new ModalidadeFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });
});

describe("ModalidadeListQueryHandler", () => {
  it("should delegate to repository.getFindAllQueryResult", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockCqrsRepository();
    repository.getFindAllQueryResult.mockResolvedValue(expected);

    const handler = new ModalidadeListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(accessContext, null);
  });
});
