import { describe, expect, it } from "vitest";
import { ObjectIdIntFactory, ObjectIdIntFactoryNullable } from "./object-id-int-factory";

describe("ObjectIdIntFactory", () => {
  describe("domain (strict)", () => {
    const schema = ObjectIdIntFactory.domain;

    it("accepts { id: 5 }", () => {
      expect(schema.safeParse({ id: 5 }).success).toBe(true);
    });

    it("rejects { id: '5' }", () => {
      expect(schema.safeParse({ id: "5" }).success).toBe(false);
    });
  });

  describe("domain (nullable)", () => {
    const schema = ObjectIdIntFactoryNullable.domain;

    it("accepts { id: 5 }", () => {
      const r = schema.safeParse({ id: 5 });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: 5 });
    });

    it("accepts null", () => {
      const r = schema.safeParse(null);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("rejects { id: null }", () => {
      expect(schema.safeParse({ id: null }).success).toBe(false);
    });

    it("rejects { id: '5' }", () => {
      expect(schema.safeParse({ id: "5" }).success).toBe(false);
    });
  });

  describe("presentation (coercion, strict)", () => {
    const schema = ObjectIdIntFactory.presentation;

    it("accepts { id: 5 }", () => {
      expect(schema.safeParse({ id: 5 }).success).toBe(true);
    });

    it("coerces { id: '5' } to { id: 5 }", () => {
      const r = schema.safeParse({ id: "5" });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: 5 });
    });

    it("rejects invalid inputs", () => {
      const invalids = ["", null, undefined, false, {}, "null", "undefined"];
      invalids.forEach((input) => {
        expect(schema.safeParse(input).success).toBe(false);
      });
    });
  });

  describe("presentation (coercion, nullable)", () => {
    const schema = ObjectIdIntFactoryNullable.presentation;

    const normalizeToNullTests = ["", null, undefined, false, {}, "null", "undefined"];
    normalizeToNullTests.forEach((input) => {
      it(`normalizes ${JSON.stringify(input)} to null`, () => {
        const r = schema.safeParse(input);
        expect(r.success).toBe(true);
        if (r.success) expect(r.data).toBe(null);
      });
    });

    it("coerces { id: '5' } to { id: 5 }", () => {
      const r = schema.safeParse({ id: "5" });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: 5 });
    });

    it("accepts { id: 5 }", () => {
      const r = schema.safeParse({ id: 5 });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: 5 });
    });
  });
});
