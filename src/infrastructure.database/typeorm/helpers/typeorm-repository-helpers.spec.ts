import { In, IsNull } from "typeorm";
import { describe, expect, it, vi } from "vitest";
import {
  buildRelationsFromColumns,
  typeormFindAll,
  typeormFindById,
} from "./typeorm-repository-helpers";

// -- Mocks --

class FakeEntity {
  id!: string;
  name?: string;
  dateDeleted?: string | null;
}

function createMockQueryBuilder(alias: string) {
  const qb = {
    alias,
    andWhere: vi.fn().mockReturnThis(),
    clone: vi.fn(),
  };
  qb.clone.mockReturnValue(qb);
  return qb;
}

function createMockRepo(opts: {
  findResult?: FakeEntity[];
  findOneResult?: FakeEntity | null;
  qbAlias?: string;
}) {
  const qb = createMockQueryBuilder(opts.qbAlias ?? "entity");
  return {
    createQueryBuilder: vi.fn().mockReturnValue(qb),
    find: vi.fn().mockResolvedValue(opts.findResult ?? []),
    findOne: vi.fn().mockResolvedValue(opts.findOneResult ?? null),
    qb,
  };
}

function createMockConn(repo: ReturnType<typeof createMockRepo>) {
  return { getRepository: vi.fn().mockReturnValue(repo) };
}

function createMockPaginationAdapter(paginatedData: FakeEntity[]) {
  return {
    paginate: vi.fn().mockResolvedValue({
      data: paginatedData,
      meta: { itemCount: paginatedData.length, totalItems: paginatedData.length },
      links: {},
    }),
  };
}

function entity(id: string, name = ""): FakeEntity {
  return { id, name, dateDeleted: null };
}

// -- Tests --

describe("typeormFindAll", () => {
  const relations = { child: { nested: true } };
  const paginateConfig = {
    sortableColumns: ["id"] as string[],
    relations,
  };
  const config = { alias: "item", hasSoftDelete: true, paginateConfig };

  it("replaces full relations with minimal relations in the config passed to nestjs-paginate", async () => {
    const deepConfig = {
      alias: "item",
      hasSoftDelete: true,
      paginateConfig: {
        sortableColumns: ["id", "child.name"] as string[],
        relations: { child: { nested: { deep: true } } },
      },
    };
    const repo = createMockRepo({ findResult: [entity("a")] });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter([entity("a")]);

    await typeormFindAll(conn as never, FakeEntity, deepConfig as never, adapter as never, null);

    const passedConfig = adapter.paginate.mock.calls[0][2];
    // Only the relation needed for sorting ("child.name" → { child: true }), not the full deep tree
    expect(passedConfig.relations).toEqual({ child: true });
    expect(passedConfig).toHaveProperty("sortableColumns");
  });

  it("loads full entities with relations via repo.find after pagination", async () => {
    const items = [entity("a"), entity("b")];
    const repo = createMockRepo({ findResult: items });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter(items);

    await typeormFindAll(conn as never, FakeEntity, config as never, adapter as never, null);

    expect(repo.find).toHaveBeenCalledOnce();
    expect(repo.find).toHaveBeenCalledWith({
      where: { id: In(["a", "b"]), dateDeleted: IsNull() },
      relations,
    });
  });

  it("preserves paginated order even when repo.find returns different order", async () => {
    const paginatedItems = [entity("1"), entity("2"), entity("3")];
    const reorderedItems = [entity("3", "C"), entity("1", "A"), entity("2", "B")];

    const repo = createMockRepo({ findResult: reorderedItems });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter(paginatedItems);

    const result = await typeormFindAll<FakeEntity, null, { data: FakeEntity[] }>(
      conn as never,
      FakeEntity,
      config as never,
      adapter as never,
      null,
    );

    expect(result.data.map((e) => e.id)).toEqual(["1", "2", "3"]);
    expect(result.data[0].name).toBe("A");
    expect(result.data[2].name).toBe("C");
  });

  it("skips second query when paginated result is empty", async () => {
    const repo = createMockRepo({});
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter([]);

    await typeormFindAll(conn as never, FakeEntity, config as never, adapter as never, null);

    expect(repo.find).not.toHaveBeenCalled();
  });

  it("skips second query when paginateConfig has no relations", async () => {
    const noRelationsConfig = {
      alias: "item",
      hasSoftDelete: true,
      paginateConfig: { sortableColumns: ["id"] as string[] },
    };
    const items = [entity("a")];
    const repo = createMockRepo({});
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter(items);

    const result = await typeormFindAll<FakeEntity, null, { data: FakeEntity[] }>(
      conn as never,
      FakeEntity,
      noRelationsConfig as never,
      adapter as never,
      null,
    );

    expect(repo.find).not.toHaveBeenCalled();
    expect(result.data).toEqual(items);
  });

  it("applies mapEntity on fully loaded entities, not paginated stubs", async () => {
    const paginatedItems = [entity("a")];
    const fullItems = [entity("a", "Full")];

    const repo = createMockRepo({ findResult: fullItems });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter(paginatedItems);

    const mapEntity = vi.fn((e: FakeEntity) => ({ mapped: e.name }));

    const result = await typeormFindAll<FakeEntity, null, { data: { mapped: string }[] }>(
      conn as never,
      FakeEntity,
      config as never,
      adapter as never,
      null,
      mapEntity,
    );

    expect(mapEntity.mock.calls[0][0]).toEqual(fullItems[0]);
    expect(result.data[0].mapped).toBe("Full");
  });

  it("omits dateDeleted filter in second query when hasSoftDelete is false", async () => {
    const noSoftDeleteConfig = {
      alias: "item",
      hasSoftDelete: false,
      paginateConfig: { sortableColumns: ["id"] as string[], relations },
    };
    const items = [entity("a")];
    const repo = createMockRepo({ findResult: items });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter(items);

    await typeormFindAll(
      conn as never,
      FakeEntity,
      noSoftDeleteConfig as never,
      adapter as never,
      null,
    );

    expect(repo.find).toHaveBeenCalledWith({
      where: { id: In(["a"]) },
      relations,
    });
  });

  it("adds soft delete where clause to query builder", async () => {
    const repo = createMockRepo({});
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter([]);

    await typeormFindAll(conn as never, FakeEntity, config as never, adapter as never, null);

    expect(repo.qb.andWhere).toHaveBeenCalledWith("item.dateDeleted IS NULL");
  });

  it("filters out entities deleted between the two queries", async () => {
    const paginatedItems = [entity("a"), entity("b"), entity("c")];
    const fullItems = [entity("a", "A"), entity("c", "C")]; // "b" deleted between queries

    const repo = createMockRepo({ findResult: fullItems });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter(paginatedItems);

    const result = await typeormFindAll<FakeEntity, null, { data: FakeEntity[] }>(
      conn as never,
      FakeEntity,
      config as never,
      adapter as never,
      null,
    );

    expect(result.data.map((e) => e.id)).toEqual(["a", "c"]);
  });

  it("includes filterable column relations in minimal relations for nestjs-paginate", async () => {
    const filterConfig = {
      alias: "item",
      hasSoftDelete: true,
      paginateConfig: {
        sortableColumns: ["id"] as string[],
        filterableColumns: { "parent.child.id": true },
        relations: { parent: { child: { deep: true } } },
      },
    };
    const repo = createMockRepo({ findResult: [entity("a")] });
    const conn = createMockConn(repo);
    const adapter = createMockPaginationAdapter([entity("a")]);

    await typeormFindAll(conn as never, FakeEntity, filterConfig as never, adapter as never, null);

    const passedConfig = adapter.paginate.mock.calls[0][2];
    expect(passedConfig.relations).toEqual({ parent: { child: true } });
  });
});

describe("buildRelationsFromColumns", () => {
  it("returns empty object for root-only columns", () => {
    expect(buildRelationsFromColumns(["id", "name"])).toEqual({});
  });

  it("builds single-level relation from dotted column", () => {
    expect(buildRelationsFromColumns(["child.name"])).toEqual({ child: true });
  });

  it("builds nested relations from deep column path", () => {
    expect(buildRelationsFromColumns(["endereco.cidade.estado.nome"])).toEqual({
      endereco: { cidade: { estado: true } },
    });
  });

  it("merges multiple columns into a single tree", () => {
    const result = buildRelationsFromColumns([
      "curso.nome",
      "curso.campus.id",
      "ambiente.bloco.nome",
    ]);
    expect(result).toEqual({
      curso: { campus: true },
      ambiente: { bloco: true },
    });
  });

  it("does not overwrite deeper relations with shallower ones", () => {
    const result = buildRelationsFromColumns(["curso.nome", "curso.campus.endereco.id"]);
    expect(result).toEqual({
      curso: { campus: { endereco: true } },
    });
  });

  it("handles empty array", () => {
    expect(buildRelationsFromColumns([])).toEqual({});
  });
});

describe("typeormFindById", () => {
  const relations = { child: true };
  const paginateConfig = { sortableColumns: ["id"] as string[], relations };
  const config = { alias: "item", hasSoftDelete: true, paginateConfig };

  it("passes relations to repo.findOne", async () => {
    const repo = createMockRepo({ findOneResult: entity("a") });
    const conn = createMockConn(repo);

    await typeormFindById(conn as never, FakeEntity, config as never, { id: "a" });

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: "a", dateDeleted: IsNull() },
      relations,
    });
  });

  it("returns null when entity is not found", async () => {
    const repo = createMockRepo({ findOneResult: null });
    const conn = createMockConn(repo);

    const result = await typeormFindById(conn as never, FakeEntity, config as never, { id: "x" });

    expect(result).toBeNull();
  });

  it("applies mapEntity when provided", async () => {
    const found = entity("a", "Test");
    const repo = createMockRepo({ findOneResult: found });
    const conn = createMockConn(repo);

    const mapEntity = vi.fn((e: FakeEntity) => ({ mapped: e.name }));

    const result = await typeormFindById(
      conn as never,
      FakeEntity,
      config as never,
      { id: "a" },
      mapEntity,
    );

    expect(mapEntity).toHaveBeenCalledWith(found);
    expect(result).toEqual({ mapped: "Test" });
  });

  it("omits dateDeleted filter when hasSoftDelete is false", async () => {
    const noSoftDeleteConfig = { ...config, hasSoftDelete: false };
    const repo = createMockRepo({ findOneResult: entity("a") });
    const conn = createMockConn(repo);

    await typeormFindById(conn as never, FakeEntity, noSoftDeleteConfig as never, { id: "a" });

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: "a" },
      relations,
    });
  });
});
