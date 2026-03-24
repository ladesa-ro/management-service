import { describe, expect, it } from "vitest";
import { buildTypeOrmPaginateConfig } from "./pagination-spec.adapter";

describe("buildTypeOrmPaginateConfig", () => {
  const spec = {
    sortableColumns: ["nome", "campus.id"],
    searchableColumns: ["nome"],
    defaultSortBy: [["nome", "ASC"]] as [string, "ASC" | "DESC"][],
    filterableColumns: { "campus.id": ["$eq"] },
  };

  it("merges spec with base paginate defaults", () => {
    const config = buildTypeOrmPaginateConfig(spec);

    expect(config.sortableColumns).toEqual(["nome", "campus.id"]);
    expect(config.searchableColumns).toEqual(["nome"]);
    expect(config.defaultSortBy).toEqual([["nome", "ASC"]]);
    expect(config.filterableColumns).toEqual({ "campus.id": ["$eq"] });
    expect(config.maxLimit).toBe(100);
    expect(config.defaultLimit).toBe(20);
  });

  it("includes relations when provided", () => {
    const relations = { campus: { endereco: true } };
    const config = buildTypeOrmPaginateConfig(spec, relations);

    expect(config.relations).toEqual({ campus: { endereco: true } });
  });

  it("omits relations when not provided", () => {
    const config = buildTypeOrmPaginateConfig(spec);

    expect(config.relations).toBeUndefined();
  });

  it("spec fields override base defaults", () => {
    const config = buildTypeOrmPaginateConfig(spec);

    // Base has sortableColumns: ["id"], spec overrides
    expect(config.sortableColumns).toEqual(["nome", "campus.id"]);
    expect(config.sortableColumns).not.toContain("id");
  });
});
