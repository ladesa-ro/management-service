import { describe, expect, it } from "vitest";
import { ObjectIdUuidFactory, ObjectIdUuidFactoryNullable } from "./object-id-uuid-factory";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("ObjectIdUuidFactory", () => {
  describe("domain (strict)", () => {
    const schema = ObjectIdUuidFactory.domain;

    it("accepts { id: validUuid }", () => {
      expect(schema.safeParse({ id: VALID_UUID }).success).toBe(true);
    });

    it("rejects { id: '' }", () => {
      expect(schema.safeParse({ id: "" }).success).toBe(false);
    });

    it("rejects null", () => {
      expect(schema.safeParse(null).success).toBe(false);
    });

    it("rejects { id: null }", () => {
      expect(schema.safeParse({ id: null }).success).toBe(false);
    });
  });

  describe("presentation (coercion, strict)", () => {
    const schema = ObjectIdUuidFactory.presentation;

    it("accepts { id: validUuid }", () => {
      const r = schema.safeParse({ id: VALID_UUID });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: VALID_UUID });
    });

    it("rejects invalid inputs", () => {
      const invalids = ["", null, undefined, false, {}, "null", "undefined"];
      invalids.forEach((input) => {
        expect(schema.safeParse(input).success).toBe(false);
      });
    });

    it("rejects [] (array is not a relation)", () => {
      expect(schema.safeParse([]).success).toBe(false);
    });
  });

  describe("domain (nullable)", () => {
    const schema = ObjectIdUuidFactoryNullable.domain;

    it("accepts { id: validUuid }", () => {
      const r = schema.safeParse({ id: VALID_UUID });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: VALID_UUID });
    });

    it("accepts null", () => {
      const r = schema.safeParse(null);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("rejects { id: null }", () => {
      expect(schema.safeParse({ id: null }).success).toBe(false);
    });

    it("rejects { id: '' }", () => {
      expect(schema.safeParse({ id: "" }).success).toBe(false);
    });
  });

  describe("presentation (coercion, nullable)", () => {
    const schema = ObjectIdUuidFactoryNullable.presentation;

    const normalizeToNullTests = ["", null, undefined, false, {}, "null", "undefined"];
    normalizeToNullTests.forEach((input) => {
      it(`normalizes ${JSON.stringify(input)} to null`, () => {
        const r = schema.safeParse(input);
        expect(r.success).toBe(true);
        if (r.success) expect(r.data).toBe(null);
      });
    });

    it("accepts { id: validUuid }", () => {
      const r = schema.safeParse({ id: VALID_UUID });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: VALID_UUID });
    });
  });
});
