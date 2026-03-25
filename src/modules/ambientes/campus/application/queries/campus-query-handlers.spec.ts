import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { CampusFindOneQueryHandlerImpl } from "./campus-find-one.query.handler";
import { CampusListQueryHandlerImpl } from "./campus-list.query.handler";

function createMockCampusRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
  };
}

describe("CampusFindOneQueryHandler", () => {
  it("should delegate to repository.getFindOneQueryResult", async () => {
    const id = createTestId();
    const entity = { id, nomeFantasia: "Campus Central" };

    const repository = createMockCampusRepository();
    repository.getFindOneQueryResult.mockResolvedValue(entity);

    const handler = new CampusFindOneQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id });

    expect(result).toEqual(entity);
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should return null when entity does not exist", async () => {
    const repository = createMockCampusRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new CampusFindOneQueryHandlerImpl(repository as any);

    const result = await handler.execute(null, { id: createTestId() });

    expect(result).toBeNull();
  });
});

describe("CampusListQueryHandler", () => {
  it("should delegate to repository.getFindAllQueryResult", async () => {
    const expected = { meta: { itemCount: 1 }, data: [{ id: createTestId() }] };

    const repository = createMockCampusRepository();
    repository.getFindAllQueryResult.mockResolvedValue(expected);

    const handler = new CampusListQueryHandlerImpl(repository as any);
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, null);

    expect(result).toEqual(expected);
    expect(repository.getFindAllQueryResult).toHaveBeenCalledWith(accessContext, null);
  });
});
