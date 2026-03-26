import { describe, expect, it } from "vitest";
import { createMapper } from "./create-mapper";

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
