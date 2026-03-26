import { describe, expect, it } from "vitest";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
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
