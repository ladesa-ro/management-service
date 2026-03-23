import { describe, expect, it } from "vitest";
import { BooleanSchema } from "./boolean-schema";

describe("BooleanSchema", () => {
  describe("domain (no coercion)", () => {
    const schema = BooleanSchema.domain;

    it("accepts true", () => {
      expect(schema.safeParse(true).success).toBe(true);
    });

    it("accepts false", () => {
      expect(schema.safeParse(false).success).toBe(true);
    });

    it("rejects string 'true'", () => {
      expect(schema.safeParse("true").success).toBe(false);
    });

    it("rejects number 1", () => {
      expect(schema.safeParse(1).success).toBe(false);
    });
  });

  describe("presentation (coercion)", () => {
    const schema = BooleanSchema.presentation;

    it("accepts true", () => {
      const r = schema.safeParse(true);
      expect(r.success && r.data).toBe(true);
    });

    it("accepts false", () => {
      const r = schema.safeParse(false);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(false);
    });

    it("coerces 1 to true", () => {
      const r = schema.safeParse(1);
      expect(r.success && r.data).toBe(true);
    });

    it("coerces 0 to false", () => {
      const r = schema.safeParse(0);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(false);
    });

    it("coerces 'true' to true", () => {
      const r = schema.safeParse("true");
      expect(r.success && r.data).toBe(true);
    });

    it("coerces 'false' to false", () => {
      const r = schema.safeParse("false");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(false);
    });

    it("coerces '1' to true", () => {
      const r = schema.safeParse("1");
      expect(r.success && r.data).toBe(true);
    });

    it("coerces '0' to false", () => {
      const r = schema.safeParse("0");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(false);
    });

    it("coerces ' TRUE ' (trim + case-insensitive)", () => {
      const r = schema.safeParse(" TRUE ");
      expect(r.success && r.data).toBe(true);
    });

    it("coerces ' False ' (trim + case-insensitive)", () => {
      const r = schema.safeParse(" False ");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(false);
    });

    it("rejects 'abc'", () => {
      expect(schema.safeParse("abc").success).toBe(false);
    });

    it("rejects 'yes'", () => {
      expect(schema.safeParse("yes").success).toBe(false);
    });

    it("rejects 2", () => {
      expect(schema.safeParse(2).success).toBe(false);
    });

    it("passes null through (for .nullable())", () => {
      const nullable = BooleanSchema.presentation.nullable();
      const r = nullable.safeParse(null);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });
  });
});
