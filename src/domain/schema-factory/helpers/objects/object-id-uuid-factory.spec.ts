import { describe, expect, it } from "vitest";
import { ObjectIdIntFactory } from "./object-id-int-factory";
import { ObjectIdUuidFactory } from "./object-id-uuid-factory";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("ObjectIdUuidFactory", () => {
  describe("domain (strict)", () => {
    const schema = ObjectIdUuidFactory.domain;

    it("accepts { id: validUuid }", () => {
      const r = schema.safeParse({ id: VALID_UUID });
      expect(r.success).toBe(true);
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

  describe("presentation (coercion)", () => {
    const schema = ObjectIdUuidFactory.presentation;

    it("accepts { id: validUuid }", () => {
      const r = schema.safeParse({ id: VALID_UUID });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: VALID_UUID });
    });

    it("normalizes { id: '' } to null", () => {
      const r = schema.safeParse({ id: "" });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes { id: null } to null", () => {
      const r = schema.safeParse({ id: null });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes { id: undefined } to null", () => {
      const r = schema.safeParse({ id: undefined });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes { id: false } to null", () => {
      const r = schema.safeParse({ id: false });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes null to null", () => {
      const r = schema.safeParse(null);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes undefined to null", () => {
      const r = schema.safeParse(undefined);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes false to null", () => {
      const r = schema.safeParse(false);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it('normalizes "null" to null', () => {
      const r = schema.safeParse("null");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it('normalizes "undefined" to null', () => {
      const r = schema.safeParse("undefined");
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("normalizes {} (no id) to null", () => {
      const r = schema.safeParse({});
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });

    it("rejects [] (array is not a relation)", () => {
      expect(schema.safeParse([]).success).toBe(false);
    });
  });
});

describe("ObjectIdIntFactory", () => {
  describe("domain", () => {
    const schema = ObjectIdIntFactory.domain;

    it("accepts { id: 5 }", () => {
      expect(schema.safeParse({ id: 5 }).success).toBe(true);
    });

    it("rejects { id: '5' }", () => {
      expect(schema.safeParse({ id: "5" }).success).toBe(false);
    });
  });

  describe("presentation", () => {
    const schema = ObjectIdIntFactory.presentation;

    it("accepts { id: 5 }", () => {
      const r = schema.safeParse({ id: 5 });
      expect(r.success).toBe(true);
    });

    it("coerces { id: '5' } to { id: 5 }", () => {
      const r = schema.safeParse({ id: "5" });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toEqual({ id: 5 });
    });

    it("normalizes { id: '' } to null", () => {
      const r = schema.safeParse({ id: "" });
      expect(r.success).toBe(true);
      if (r.success) expect(r.data).toBe(null);
    });
  });
});
