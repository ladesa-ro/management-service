import { describe, expect, it } from "vitest";
import { z } from "zod";
import { coerceArray, coerceFilterArray, stringFilterSchema, uuidFilterSchema } from "./schemas";

describe("coerceArray", () => {
  const schema = coerceArray(z.string());

  it("returns undefined for undefined", () => {
    expect(schema.parse(undefined)).toBeUndefined();
  });

  it("returns undefined for null", () => {
    expect(schema.parse(null)).toBeUndefined();
  });

  it("wraps single value in array", () => {
    expect(schema.parse("abc")).toEqual(["abc"]);
  });

  it("passes through array as-is", () => {
    expect(schema.parse(["a", "b"])).toEqual(["a", "b"]);
  });

  it("keeps empty strings", () => {
    expect(schema.parse("")).toEqual([""]);
  });

  it("keeps empty strings in array", () => {
    expect(schema.parse(["a", ""])).toEqual(["a", ""]);
  });
});

describe("coerceFilterArray", () => {
  const schema = coerceFilterArray(z.string());

  it("returns undefined for undefined", () => {
    expect(schema.parse(undefined)).toBeUndefined();
  });

  it("returns undefined for null", () => {
    expect(schema.parse(null)).toBeUndefined();
  });

  it("wraps single value in array", () => {
    expect(schema.parse("abc")).toEqual(["abc"]);
  });

  it("passes through array as-is", () => {
    expect(schema.parse(["a", "b"])).toEqual(["a", "b"]);
  });

  it("returns undefined for empty string", () => {
    expect(schema.parse("")).toBeUndefined();
  });

  it("returns undefined for whitespace-only string", () => {
    expect(schema.parse("   ")).toBeUndefined();
  });

  it("filters empty strings from array", () => {
    expect(schema.parse(["a", "", "b"])).toEqual(["a", "b"]);
  });

  it("filters whitespace-only strings from array", () => {
    expect(schema.parse(["a", "  ", "b"])).toEqual(["a", "b"]);
  });

  it("returns undefined when all items are empty", () => {
    expect(schema.parse(["", "  "])).toBeUndefined();
  });
});

describe("stringFilterSchema", () => {
  it("accepts valid string", () => {
    expect(stringFilterSchema.parse("abc")).toEqual(["abc"]);
  });

  it("strips empty string", () => {
    expect(stringFilterSchema.parse("")).toBeUndefined();
  });
});

describe("uuidFilterSchema", () => {
  const validUuid = "01936b9a-7c5e-7d80-b5f8-a1b2c3d4e5f6";

  it("accepts valid uuid", () => {
    expect(uuidFilterSchema.parse(validUuid)).toEqual([validUuid]);
  });

  it("strips empty string before uuid validation", () => {
    expect(uuidFilterSchema.parse("")).toBeUndefined();
  });

  it("rejects invalid uuid", () => {
    expect(() => uuidFilterSchema.parse("not-a-uuid")).toThrow();
  });
});
