import { describe, expect, it } from "vitest";
import { IntSchema } from "./int-schema";
import { NumberSchema } from "./number-schema";

describe("NumberSchema", () => {
  describe("domain (no coercion)", () => {
    const schema = NumberSchema.domain;

    it("accepts valid number", () => {
      expect(schema.safeParse(42).success).toBe(true);
    });

    it("rejects string", () => {
      expect(schema.safeParse("42").success).toBe(false);
    });

    it("rejects boolean", () => {
      expect(schema.safeParse(false).success).toBe(false);
    });
  });

  describe("presentation (coercion)", () => {
    const schema = NumberSchema.presentation;

    it("accepts valid number", () => {
      const r = schema.safeParse(42);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(42);
    });

    it("coerces '42' to 42", () => {
      const r = schema.safeParse("42");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(42);
    });

    it("coerces ' 42 ' to 42 (trim)", () => {
      const r = schema.safeParse(" 42 ");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(42);
    });

    it("coerces '3.14' to 3.14", () => {
      const r = schema.safeParse("3.14");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(3.14);
    });

    it("converts '' to undefined (never 0)", () => {
      const r = schema.safeParse("");
      expect(r.success).toBe(false);
    });

    it("converts '   ' to undefined (never 0)", () => {
      const r = schema.safeParse("   ");
      expect(r.success).toBe(false);
    });

    it("rejects 'NaN'", () => {
      expect(schema.safeParse("NaN").success).toBe(false);
    });

    it("rejects 'Infinity'", () => {
      expect(schema.safeParse("Infinity").success).toBe(false);
    });

    it("rejects '-Infinity'", () => {
      expect(schema.safeParse("-Infinity").success).toBe(false);
    });

    it("rejects 'null'", () => {
      expect(schema.safeParse("null").success).toBe(false);
    });

    it("rejects 'undefined'", () => {
      expect(schema.safeParse("undefined").success).toBe(false);
    });

    it("rejects runtime NaN", () => {
      expect(schema.safeParse(Number.NaN).success).toBe(false);
    });

    it("rejects runtime Infinity", () => {
      expect(schema.safeParse(Number.POSITIVE_INFINITY).success).toBe(false);
    });

    it("rejects 'abc'", () => {
      expect(schema.safeParse("abc").success).toBe(false);
    });

    // Guards explícitos
    it("rejects false (Number(false)===0 mascara erro)", () => {
      expect(schema.safeParse(false).success).toBe(false);
    });

    it("rejects true (Number(true)===1 mascara erro)", () => {
      expect(schema.safeParse(true).success).toBe(false);
    });

    it("rejects [] (Number([])===0 é perigoso)", () => {
      expect(schema.safeParse([]).success).toBe(false);
    });

    it("rejects [42] (Number([42])===42 é perigoso)", () => {
      expect(schema.safeParse([42]).success).toBe(false);
    });

    it("rejects {} (rejeição explícita)", () => {
      expect(schema.safeParse({}).success).toBe(false);
    });

    // Passthrough
    it("passes null through (for .nullable())", () => {
      const nullable = NumberSchema.presentation.nullable();
      const r = nullable.safeParse(null);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });
  });
});

describe("IntSchema", () => {
  describe("presentation", () => {
    const schema = IntSchema.presentation;

    it("accepts integer", () => {
      const r = schema.safeParse("42");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(42);
    });

    it("rejects float", () => {
      expect(schema.safeParse("3.14").success).toBe(false);
    });

    it("rejects float number", () => {
      expect(schema.safeParse(3.14).success).toBe(false);
    });
  });

  describe("domain", () => {
    const schema = IntSchema.domain;

    it("accepts integer", () => {
      expect(schema.safeParse(42).success).toBe(true);
    });

    it("rejects string", () => {
      expect(schema.safeParse("42").success).toBe(false);
    });

    it("rejects float", () => {
      expect(schema.safeParse(3.14).success).toBe(false);
    });
  });
});
