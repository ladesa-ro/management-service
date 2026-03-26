import { describe, expect, it } from "vitest";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  into,
  mapField,
} from "./create-mapper";

describe("createMapper", () => {
  it("maps a single input to the expected output", () => {
    const mapper = createMapper<{ a: number; b: string }, { x: number; y: string }>((input) => ({
      x: input.a,
      y: input.b,
    }));

    expect(mapper.map({ a: 1, b: "hello" })).toEqual({ x: 1, y: "hello" });
  });

  it("maps an array of inputs", () => {
    const mapper = createMapper<{ id: number }, { id: string }>((input) => ({
      id: String(input.id),
    }));

    expect(mapper.mapArray([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual([
      { id: "1" },
      { id: "2" },
      { id: "3" },
    ]);
  });

  it("returns an empty array when mapArray receives an empty array", () => {
    const mapper = createMapper<{ id: number }, { id: number }>((input) => ({ id: input.id }));

    expect(mapper.mapArray([])).toEqual([]);
  });

  it("preserves null and undefined field values", () => {
    const mapper = createMapper<
      { a: string | null; b: string | undefined },
      { a: string | null; b: string | undefined }
    >((input) => ({
      a: input.a,
      b: input.b,
    }));

    expect(mapper.map({ a: null, b: undefined })).toEqual({ a: null, b: undefined });
  });

  it("does not mutate the input object", () => {
    const input = { value: 1 };
    const mapper = createMapper<{ value: number }, { value: number }>((src) => ({
      value: src.value + 1,
    }));

    mapper.map(input);

    expect(input.value).toBe(1);
  });
});

describe("createListMapper", () => {
  class TestListDto {
    meta: unknown;
    data: { name: string }[] = [];
  }

  const itemMapper = createMapper<{ id: number; label: string }, { name: string }>((input) => ({
    name: input.label,
  }));

  it("maps data items using the item mapper", () => {
    const listMapper = createListMapper(TestListDto, itemMapper);

    const result = listMapper({
      meta: { total: 2 },
      data: [
        { id: 1, label: "A" },
        { id: 2, label: "B" },
      ],
    });

    expect(result.data).toEqual([{ name: "A" }, { name: "B" }]);
  });

  it("passes meta through unchanged", () => {
    const listMapper = createListMapper(TestListDto, itemMapper);
    const meta = { currentPage: 1, totalItems: 5 };

    const result = listMapper({ meta, data: [] });

    expect(result.meta).toBe(meta);
  });

  it("returns an instance of the DTO class", () => {
    const listMapper = createListMapper(TestListDto, itemMapper);

    const result = listMapper({ meta: null, data: [] });

    expect(result).toBeInstanceOf(TestListDto);
  });

  it("handles empty data array", () => {
    const listMapper = createListMapper(TestListDto, itemMapper);

    const result = listMapper({ meta: {}, data: [] });

    expect(result.data).toEqual([]);
  });
});

describe("createPaginatedInputMapper", () => {
  class TestQuery {
    page?: number | null;
    limit?: number | null;
    search?: string | null;
    sortBy?: string[] | null;
    "filter.nome"?: string;
  }

  it("maps pagination fields automatically", () => {
    const mapper = createPaginatedInputMapper<
      { page?: number; limit?: number; search?: string; sortBy?: string[] },
      TestQuery
    >(TestQuery, () => {});

    const result = mapper.map({ page: 2, limit: 10, search: "abc", sortBy: ["nome:ASC"] });

    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.search).toBe("abc");
    expect(result.sortBy).toEqual(["nome:ASC"]);
  });

  it("skips undefined pagination fields", () => {
    const mapper = createPaginatedInputMapper<{ page?: number }, TestQuery>(TestQuery, () => {});

    const result = mapper.map({});

    expect(result.page).toBeUndefined();
    expect(result.limit).toBeUndefined();
  });

  it("maps custom filters via callback", () => {
    interface DtoWithFilter {
      page?: number;
      filtroNome?: string;
    }

    const mapper = createPaginatedInputMapper<DtoWithFilter, TestQuery>(TestQuery, (dto, query) => {
      if (dto.filtroNome !== undefined) query["filter.nome"] = dto.filtroNome;
    });

    const result = mapper.map({ filtroNome: "teste" });

    expect(result["filter.nome"]).toBe("teste");
  });

  it("returns a Mapper with mapArray support", () => {
    const mapper = createPaginatedInputMapper<{ page?: number }, TestQuery>(TestQuery, () => {});

    const results = mapper.mapArray([{ page: 1 }, { page: 2 }]);

    expect(results).toHaveLength(2);
    expect(results[0].page).toBe(1);
    expect(results[1].page).toBe(2);
  });
});

describe("mapField", () => {
  it("copies a defined field from source to target", () => {
    const target: { nome?: string } = {};
    const source = { nome: "Teste" };

    mapField(target, "nome", source, "nome");

    expect(target.nome).toBe("Teste");
  });

  it("skips undefined fields", () => {
    const target: { nome?: string } = { nome: "Original" };
    const source: { nome?: string } = {};

    mapField(target, "nome", source, "nome");

    expect(target.nome).toBe("Original");
  });

  it("copies null values (not undefined)", () => {
    const target: { valor?: string | null } = { valor: "algo" };
    const source: { valor?: string | null } = { valor: null };

    mapField(target, "valor", source, "valor");

    expect(target.valor).toBeNull();
  });

  it("renames fields between source and target", () => {
    const target: { "filter.id"?: string[] } = {};
    const source = { filterId: ["1", "2"] };

    mapField(target, "filter.id", source, "filterId");

    expect(target["filter.id"]).toEqual(["1", "2"]);
  });
});

describe("into", () => {
  it("maps fields with .from(source).field(key)", () => {
    const target: { page?: number; limit?: number } = {};
    const source = { page: 2, limit: 10 };

    into(target).from(source).field("page").field("limit");

    expect(target.page).toBe(2);
    expect(target.limit).toBe(10);
  });

  it("skips undefined fields", () => {
    const target: { page?: number; limit?: number } = { page: 1 };
    const source: { page?: number } = {};

    into(target).from(source).field("page");

    expect(target.page).toBe(1);
  });

  it("renames fields with .from(source).field(targetKey, sourceKey)", () => {
    const target: { "filter.id"?: string[] } = {};
    const source = { filterId: ["1", "2"] };

    into(target).from(source).field("filter.id", "filterId");

    expect(target["filter.id"]).toEqual(["1", "2"]);
  });

  it("supports per-field .from() without global source", () => {
    const target: { "filter.id"?: string[]; tenantId?: string } = {};
    const dto = { filterId: ["a"] };
    const ctx = { tenantId: "t1" };

    into(target).field("filter.id").from(dto, "filterId").field("tenantId").from(ctx, "tenantId");

    expect(target["filter.id"]).toEqual(["a"]);
    expect(target.tenantId).toBe("t1");
  });

  it("applies transform via .field().transform().from()", () => {
    const target: { nome?: string } = {};
    const source = { nome: "teste" };

    into(target)
      .field("nome")
      .transform((v) => (v as string).toUpperCase())
      .from(source);

    expect(target.nome).toBe("TESTE");
  });

  it("applies default when value is undefined", () => {
    const target: { page?: number } = {};
    const source: { page?: number } = {};

    into(target).field("page").default(1).from(source);

    expect(target.page).toBe(1);
  });

  it("applies default when value is null", () => {
    const target: { page?: number | null } = {};
    const source = { page: null };

    into(target).field("page").default(1).from(source);

    expect(target.page).toBe(1);
  });

  it("skips field when .when() predicate returns false", () => {
    const target: { status?: string } = { status: "ORIGINAL" };
    const source = { status: "DELETED" };

    into(target)
      .field("status")
      .when((v) => v !== "DELETED")
      .from(source);

    expect(target.status).toBe("ORIGINAL");
  });

  it("throws on .required() when value is nil", () => {
    const target: { userId?: string } = {};
    const source: { userId?: string } = {};

    expect(() => {
      into(target).field("userId").required().from(source);
    }).toThrow('into: field "userId" is required');
  });

  it("skips on .optional() when value is nil", () => {
    const target: { extra?: string } = { extra: "keep" };
    const source: { extra?: string } = {};

    into(target).field("extra").optional().from(source);

    expect(target.extra).toBe("keep");
  });

  it("executes pipeline in correct order: transform → default → when → required", () => {
    const target: { value?: number } = {};
    const source = { value: "5" };

    into(target)
      .field("value")
      .transform((v) => Number(v))
      .from(source);

    expect(target.value).toBe(5);
  });

  it("copies null values (not skipped like undefined)", () => {
    const target: { nome?: string | null } = { nome: "original" };
    const source: { nome: string | null } = { nome: null };

    into(target).from(source).field("nome");

    expect(target.nome).toBeNull();
  });

  // ==========================================================================
  // Happy path — forma canônica (.from global)
  // ==========================================================================

  it("maps multiple fields from global source in sequence", () => {
    const target: { a?: number; b?: string; c?: boolean } = {};
    const source = { a: 1, b: "x", c: true };

    into(target).from(source).field("a").field("b").field("c");

    expect(target).toEqual({ a: 1, b: "x", c: true });
  });

  it("renames multiple fields from global source", () => {
    const target: { "filter.id"?: string; "filter.nome"?: string } = {};
    const source = { filterId: "1", filterNome: "abc" };

    into(target).from(source).field("filter.id", "filterId").field("filter.nome", "filterNome");

    expect(target["filter.id"]).toBe("1");
    expect(target["filter.nome"]).toBe("abc");
  });

  // ==========================================================================
  // Happy path — forma per-field (.field().from())
  // ==========================================================================

  it("maps from multiple different sources", () => {
    const target: { userId?: string; tenantId?: string; role?: string } = {};

    into(target)
      .field("userId")
      .from({ userId: "u1" })
      .field("tenantId")
      .from({ tenantId: "t1" })
      .field("role")
      .from({ role: "admin" });

    expect(target).toEqual({ userId: "u1", tenantId: "t1", role: "admin" });
  });

  it("per-field .from() with explicit sourceKey rename", () => {
    const target: { "filter.status"?: string } = {};

    into(target).field("filter.status").from({ filterStatus: "ACTIVE" }, "filterStatus");

    expect(target["filter.status"]).toBe("ACTIVE");
  });

  it("per-field .from() defaults sourceKey to targetKey", () => {
    const target: { nome?: string } = {};

    into(target).field("nome").from({ nome: "Teste" });

    expect(target.nome).toBe("Teste");
  });

  // ==========================================================================
  // Pipeline — transform
  // ==========================================================================

  it("transform receives the raw value", () => {
    const target: { count?: number } = {};

    into(target)
      .field("count")
      .transform((v) => (v as string).length)
      .from({ count: "hello" });

    expect(target.count).toBe(5);
  });

  it("transform can return null (triggers default if set)", () => {
    const target: { value?: string } = {};

    into(target)
      .field("value")
      .transform(() => null)
      .default("fallback")
      .from({ value: "ignored" });

    expect(target.value).toBe("fallback");
  });

  it("transform can return undefined (skips set)", () => {
    const target: { value?: string } = { value: "original" };

    into(target)
      .field("value")
      .transform(() => undefined)
      .from({ value: "ignored" });

    expect(target.value).toBe("original");
  });

  // ==========================================================================
  // Pipeline — default
  // ==========================================================================

  it("default does NOT override a defined value", () => {
    const target: { page?: number } = {};

    into(target).field("page").default(99).from({ page: 3 });

    expect(target.page).toBe(3);
  });

  it("default does NOT override zero", () => {
    const target: { count?: number } = {};

    into(target).field("count").default(10).from({ count: 0 });

    expect(target.count).toBe(0);
  });

  it("default does NOT override empty string", () => {
    const target: { nome?: string } = {};

    into(target).field("nome").default("fallback").from({ nome: "" });

    expect(target.nome).toBe("");
  });

  it("default does NOT override false", () => {
    const target: { ativo?: boolean } = {};

    into(target).field("ativo").default(true).from({ ativo: false });

    expect(target.ativo).toBe(false);
  });

  // ==========================================================================
  // Pipeline — when
  // ==========================================================================

  it("when allows field when predicate is true", () => {
    const target: { status?: string } = {};

    into(target)
      .field("status")
      .when((v) => v === "ACTIVE")
      .from({ status: "ACTIVE" });

    expect(target.status).toBe("ACTIVE");
  });

  it("when receives the transformed value (not raw)", () => {
    const target: { value?: number } = {};

    into(target)
      .field("value")
      .transform((v) => Number(v))
      .when((v) => (v as number) > 0)
      .from({ value: "5" });

    expect(target.value).toBe(5);
  });

  it("when with false predicate preserves existing target value", () => {
    const target: { x?: number } = { x: 42 };

    into(target)
      .field("x")
      .when((v) => (v as number) > 100)
      .from({ x: 10 });

    expect(target.x).toBe(42);
  });

  // ==========================================================================
  // Pipeline — required
  // ==========================================================================

  it("required passes when value is defined", () => {
    const target: { id?: string } = {};

    into(target).field("id").required().from({ id: "abc" });

    expect(target.id).toBe("abc");
  });

  it("required throws when value is null", () => {
    const target: { id?: string | null } = {};

    expect(() => {
      into(target).field("id").required().from({ id: null });
    }).toThrow('into: field "id" is required');
  });

  it("required throws with correct field name in message", () => {
    const target: { "filter.campusId"?: string } = {};

    expect(() => {
      into(target).field("filter.campusId").required().from({});
    }).toThrow('into: field "filter.campusId" is required');
  });

  // ==========================================================================
  // Pipeline — optional
  // ==========================================================================

  it("optional skips when value is null", () => {
    const target: { x?: string | null } = { x: "keep" };

    into(target).field("x").optional().from({ x: null });

    expect(target.x).toBe("keep");
  });

  it("optional sets when value is defined", () => {
    const target: { x?: string } = {};

    into(target).field("x").optional().from({ x: "ok" });

    expect(target.x).toBe("ok");
  });

  // ==========================================================================
  // Pipeline order: resolve → transform → default → when → required → set
  // ==========================================================================

  it("full pipeline: transform → default → when → set", () => {
    const target: { score?: number } = {};

    into(target)
      .field("score")
      .transform((v) => (v != null ? Number(v) : null))
      .default(0)
      .when((v) => (v as number) >= 0)
      .from({ score: "-1" });

    // transform: "-1" → -1
    // default: -1 is not nil, skip
    // when: -1 >= 0 is false → skip set
    expect(target.score).toBeUndefined();
  });

  it("full pipeline: transform returns null → default kicks in → when passes", () => {
    const target: { status?: string } = {};

    into(target)
      .field("status")
      .transform((v) => (v === "UNKNOWN" ? null : v))
      .default("PENDING")
      .when((v) => v !== "DELETED")
      .from({ status: "UNKNOWN" });

    // transform: "UNKNOWN" → null
    // default: null → "PENDING"
    // when: "PENDING" !== "DELETED" → true
    expect(target.status).toBe("PENDING");
  });

  // ==========================================================================
  // Edge cases — isolation between fields
  // ==========================================================================

  it("pipeline state does NOT leak between fields (per-field form)", () => {
    const target: { a?: number; b?: number } = {};

    into(target).field("a").default(99).from({ a: undefined }).field("b").from({ b: undefined });

    expect(target.a).toBe(99);
    expect(target.b).toBeUndefined();
  });

  it("pipeline state does NOT leak between fields (global form)", () => {
    const target: { a?: number; b?: number } = {};
    const source: { a?: number; b?: number } = {};

    // Only "a" has a default — "b" should NOT get it

    into(target).field("a").default(10).from(source);

    into(target).from(source).field("b");

    expect(target.a).toBe(10);
    expect(target.b).toBeUndefined();
  });

  // ==========================================================================
  // Edge cases — field without .from() is discarded
  // ==========================================================================

  it("field without .from() and without global source is discarded on next .field()", () => {
    const target: { a?: string; b?: string } = {};

    into(target)
      .field("a") // no .from(), will be discarded
      .field("b")
      .from({ b: "ok" });

    expect(target.a).toBeUndefined();
    expect(target.b).toBe("ok");
  });

  // ==========================================================================
  // Edge cases — values
  // ==========================================================================

  it("handles zero as a valid value", () => {
    const target: { count?: number } = {};

    into(target).field("count").from({ count: 0 });

    expect(target.count).toBe(0);
  });

  it("handles empty string as a valid value", () => {
    const target: { nome?: string } = {};

    into(target).field("nome").from({ nome: "" });

    expect(target.nome).toBe("");
  });

  it("handles false as a valid value", () => {
    const target: { ativo?: boolean } = {};

    into(target).field("ativo").from({ ativo: false });

    expect(target.ativo).toBe(false);
  });

  it("handles array values", () => {
    const target: { ids?: string[] } = {};

    into(target)
      .field("ids")
      .from({ ids: ["a", "b"] });

    expect(target.ids).toEqual(["a", "b"]);
  });

  it("handles nested object values", () => {
    const target: { endereco?: { id: string } } = {};

    into(target)
      .field("endereco")
      .from({ endereco: { id: "e1" } });

    expect(target.endereco).toEqual({ id: "e1" });
  });

  // ==========================================================================
  // Edge cases — source key missing entirely
  // ==========================================================================

  it("source key not present at all leaves target unchanged", () => {
    const target: { x?: string } = { x: "original" };

    into(target).field("x").from({});

    expect(target.x).toBe("original");
  });

  // ==========================================================================
  // Realistic scenario
  // ==========================================================================

  it("realistic: maps paginated input with rename, default, and required", () => {
    const query: {
      page?: number;
      limit?: number;
      search?: string;
      "filter.id"?: string[];
      tenantId?: string;
    } = {};

    const dto = { filterId: ["1"], page: 2 };
    const context = { tenantId: "t1" };

    into(query)
      .field("filter.id")
      .from(dto, "filterId")
      .field("page")
      .default(1)
      .from(dto)
      .field("limit")
      .default(20)
      .from(dto)
      .field("tenantId")
      .required()
      .from(context);

    expect(query).toEqual({
      "filter.id": ["1"],
      page: 2,
      limit: 20,
      tenantId: "t1",
    });
  });
});
