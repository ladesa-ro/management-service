import { describe, expect, it } from "vitest";
import { z } from "zod";
import { buildCacheKey } from "./cache-key";
import { createSchema, type InferSchemaFactory } from "./create-schema";
import { isPlainObject } from "./helpers/utils";
import { mergeExtra } from "./merge-extra";
import { DOMAIN_OPTIONS, PRESENTATION_OPTIONS } from "./schema-options";

describe("SchemaFactory", () => {
  describe("createSchema with number coercion", () => {
    const numericSchema = createSchema((standard) => {
      const base = standard.coerce ? z.coerce.number() : z.number();
      return base.int().min(0).nullable().optional();
    });

    it("coerces string to number in presentation mode", () => {
      const schema = numericSchema.presentation;
      const result = schema.safeParse("12");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(12);
      }
    });

    it("rejects string as number in domain mode", () => {
      const schema = numericSchema.domain;
      const result = schema.safeParse("12");
      expect(result.success).toBe(false);
    });

    it("passes valid number in both modes", () => {
      expect(numericSchema.domain.safeParse(12).success).toBe(true);
      expect(numericSchema.presentation.safeParse(12).success).toBe(true);
    });

    it("passes null in both modes", () => {
      const domainResult = numericSchema.domain.safeParse(null);
      const presentationResult = numericSchema.presentation.safeParse(null);
      expect(domainResult.success).toBe(true);
      expect(presentationResult.success).toBe(true);
      if (domainResult.success) expect(domainResult.data).toBe(null);
      if (presentationResult.success) expect(presentationResult.data).toBe(null);
    });

    it("rejects invalid string in both modes", () => {
      expect(numericSchema.domain.safeParse("abc").success).toBe(false);
      expect(numericSchema.presentation.safeParse("abc").success).toBe(false);
    });
  });

  describe("createSchema with boolean coercion", () => {
    // Note: z.coerce.boolean() uses Boolean() which treats any non-empty string as true.
    // For correct "true"/"false" coercion, use z.preprocess instead.
    const boolSchema = createSchema((standard) => {
      if (standard.coerce) {
        return z
          .preprocess((val) => {
            if (val === "true") return true;
            if (val === "false") return false;
            return val;
          }, z.boolean())
          .optional();
      }
      return z.boolean().optional();
    });

    it("coerces 'true' to true in presentation", () => {
      const result = boolSchema.presentation.safeParse("true");
      expect(result.success).toBe(true);
      if (result.success) expect(result.data).toBe(true);
    });

    it("coerces 'false' to false in presentation", () => {
      const result = boolSchema.presentation.safeParse("false");
      expect(result.success).toBe(true);
      if (result.success) expect(result.data).toBe(false);
    });

    it("rejects string in domain", () => {
      expect(boolSchema.domain.safeParse("true").success).toBe(false);
    });
  });

  describe("createSchema with object (strict)", () => {
    const objectSchema = createSchema((standard) =>
      z.object({
        nome: z.string().min(1),
        capacidade: standard.coerce ? z.coerce.number().int() : z.number().int(),
      }),
    );

    it("strips unknown fields in presentation", () => {
      const result = objectSchema.presentation.safeParse({
        nome: "Sala 1",
        capacidade: 50,
        extra: "should be stripped",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ nome: "Sala 1", capacidade: 50 });
        expect("extra" in result.data).toBe(false);
      }
    });

    it("rejects unknown fields in domain (strict)", () => {
      const result = objectSchema.domain.safeParse({
        nome: "Sala 1",
        capacidade: 50,
        extra: "should be rejected",
      });
      expect(result.success).toBe(false);
    });

    it("coerces number fields in presentation", () => {
      const result = objectSchema.presentation.safeParse({
        nome: "Sala 1",
        capacidade: "50",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.capacidade).toBe(50);
      }
    });

    it("rejects string number in domain", () => {
      const result = objectSchema.domain.safeParse({
        nome: "Sala 1",
        capacidade: "50",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("relation normalization", () => {
    const uuidSchema = z.string().uuid();

    const refSchema = createSchema((standard) => {
      const base = z.object({ id: uuidSchema });

      if (!standard.coerce) return base;

      return z.preprocess((val) => {
        if (!isPlainObject(val)) return val;
        const id = val.id;
        if (id === "" || id === null || id === undefined) return null;
        return val;
      }, base.nullable());
    });

    const validUuid = "019d1c15-490f-711b-9e0d-78d55d39e329";

    it("passes valid relation in both modes", () => {
      const input = { id: validUuid };
      expect(refSchema.domain.safeParse(input).success).toBe(true);
      expect(refSchema.presentation.safeParse(input).success).toBe(true);
    });

    it("normalizes { id: '' } to null in presentation", () => {
      const result = refSchema.presentation.safeParse({ id: "" });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data).toBe(null);
    });

    it("normalizes { id: null } to null in presentation", () => {
      const result = refSchema.presentation.safeParse({ id: null });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data).toBe(null);
    });

    it("normalizes { id: undefined } to null in presentation", () => {
      const result = refSchema.presentation.safeParse({ id: undefined });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data).toBe(null);
    });

    it("rejects { id: '' } in domain (not a valid uuid)", () => {
      expect(refSchema.domain.safeParse({ id: "" }).success).toBe(false);
    });
  });

  describe("composed schemas with standard propagation", () => {
    const nameSchema = createSchema(() => z.string().min(1));

    const capacitySchema = createSchema((standard) => {
      const base = standard.coerce ? z.coerce.number() : z.number();
      return base.int().min(0).nullable().optional();
    });

    const composedSchema = createSchema((standard) =>
      z.object({
        nome: nameSchema.create(standard),
        capacidade: capacitySchema.create(standard),
      }),
    );

    it("propagates coercion to child schemas in presentation", () => {
      const result = composedSchema.presentation.safeParse({
        nome: "Sala 1",
        capacidade: "30",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.capacidade).toBe(30);
      }
    });

    it("rejects coercion in domain through composition", () => {
      const result = composedSchema.domain.safeParse({
        nome: "Sala 1",
        capacidade: "30",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("superRefine preservation", () => {
    const schemaWithRefine = createSchema((standard) =>
      z
        .object({
          dataInicio: z.string(),
          dataFim: z.string().nullable().optional(),
        })
        .superRefine((data, ctx) => {
          if (data.dataInicio && data.dataFim) {
            if (new Date(data.dataFim) < new Date(data.dataInicio)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "dataFim must be >= dataInicio",
                path: ["dataFim"],
              });
            }
          }
        }),
    );

    it("validates cross-field rules in domain", () => {
      const result = schemaWithRefine.domain.safeParse({
        dataInicio: "2026-03-01",
        dataFim: "2026-02-01",
      });
      expect(result.success).toBe(false);
    });

    it("validates cross-field rules in presentation", () => {
      const result = schemaWithRefine.presentation.safeParse({
        dataInicio: "2026-03-01",
        dataFim: "2026-02-01",
      });
      expect(result.success).toBe(false);
    });

    it("passes valid cross-field data in domain with strict", () => {
      const result = schemaWithRefine.domain.safeParse({
        dataInicio: "2026-03-01",
        dataFim: "2026-04-01",
      });
      expect(result.success).toBe(true);
    });

    it("rejects unknown fields with superRefine in domain", () => {
      const result = schemaWithRefine.domain.safeParse({
        dataInicio: "2026-03-01",
        dataFim: "2026-04-01",
        extra: "nope",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("array of objects coercion", () => {
    const itemSchema = createSchema((standard) =>
      z.object({
        diaSemana: standard.coerce ? z.coerce.number().int() : z.number().int(),
        hora: z.string(),
      }),
    );

    const parentSchema = createSchema((standard) =>
      z.object({
        horarios: z.array(itemSchema.create(standard)).optional(),
      }),
    );

    it("coerces array element fields in presentation", () => {
      const result = parentSchema.presentation.safeParse({
        horarios: [
          { diaSemana: "1", hora: "08:00" },
          { diaSemana: "3", hora: "10:00" },
        ],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.horarios?.[0]?.diaSemana).toBe(1);
        expect(result.data.horarios?.[1]?.diaSemana).toBe(3);
      }
    });

    it("rejects string in array elements in domain", () => {
      const result = parentSchema.domain.safeParse({
        horarios: [{ diaSemana: "1", hora: "08:00" }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("cache", () => {
    it("returns same schema instance for same options", () => {
      const factory = createSchema(() => z.string());
      const a = factory.domain;
      const b = factory.domain;
      expect(a).toBe(b);
    });

    it("returns different instances for different modes", () => {
      const factory = createSchema((standard) =>
        z.object({ n: standard.coerce ? z.coerce.number() : z.number() }),
      );
      const domain = factory.domain;
      const presentation = factory.presentation;
      expect(domain).not.toBe(presentation);
    });
  });

  describe("extra options", () => {
    type TestExtra = {
      maxLength?: number;
      [key: string]: unknown;
    };

    const factory = createSchema<z.ZodString, TestExtra>((standard, extra) => {
      let schema = z.string().min(1);
      if (extra?.maxLength) {
        schema = schema.max(extra.maxLength);
      }
      return schema;
    });

    it("passes extra options to factory", () => {
      const schema = factory.create(DOMAIN_OPTIONS, { maxLength: 5 });
      expect(schema.safeParse("abcdef").success).toBe(false);
      expect(schema.safeParse("abc").success).toBe(true);
    });

    it("caches separately with different extra", () => {
      const a = factory.create(DOMAIN_OPTIONS, { maxLength: 5 });
      const b = factory.create(DOMAIN_OPTIONS, { maxLength: 10 });
      expect(a).not.toBe(b);
    });
  });

  describe("schemas without coercion", () => {
    const stringSchema = createSchema(() => z.string().min(1));

    it("works identically in both modes for string fields", () => {
      expect(stringSchema.domain.safeParse("hello").success).toBe(true);
      expect(stringSchema.presentation.safeParse("hello").success).toBe(true);
      expect(stringSchema.domain.safeParse("").success).toBe(false);
      expect(stringSchema.presentation.safeParse("").success).toBe(false);
    });
  });
});

describe("isPlainObject", () => {
  it("returns true for plain objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });

  it("returns true for Object.create(null)", () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("returns false for non-objects", () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject("str")).toBe(false);
  });

  it("returns false for arrays", () => {
    expect(isPlainObject([])).toBe(false);
  });

  it("returns false for class instances", () => {
    class Foo {}
    expect(isPlainObject(new Foo())).toBe(false);
  });

  it("returns false for Date", () => {
    expect(isPlainObject(new Date())).toBe(false);
  });
});

describe("buildCacheKey", () => {
  it("produces deterministic key without extra", () => {
    const key = buildCacheKey(DOMAIN_OPTIONS);
    expect(key).toBe("domain|true|false");
  });

  it("produces deterministic key with extra", () => {
    const key = buildCacheKey(PRESENTATION_OPTIONS, { maxLength: 10 });
    expect(key).toBe('presentation|false|true|{"maxLength":10}');
  });

  it("produces same key for same inputs", () => {
    const a = buildCacheKey(DOMAIN_OPTIONS, { x: 1 });
    const b = buildCacheKey(DOMAIN_OPTIONS, { x: 1 });
    expect(a).toBe(b);
  });

  it("produces different keys for different inputs", () => {
    const a = buildCacheKey(DOMAIN_OPTIONS);
    const b = buildCacheKey(PRESENTATION_OPTIONS);
    expect(a).not.toBe(b);
  });
});

describe("mergeExtra", () => {
  it("returns undefined when both are undefined", () => {
    expect(mergeExtra(undefined, undefined)).toBeUndefined();
  });

  it("returns base when override is undefined", () => {
    expect(mergeExtra({ a: 1 }, undefined)).toEqual({ a: 1 });
  });

  it("merges override into base", () => {
    expect(mergeExtra({ a: 1, b: 2 }, { b: 3 })).toEqual({ a: 1, b: 3 });
  });
});

describe("InferSchemaFactory type helper", () => {
  it("infers correct type (compile-time check)", () => {
    const factory = createSchema(() =>
      z.object({
        nome: z.string(),
        capacidade: z.number().nullable(),
      }),
    );

    type Inferred = InferSchemaFactory<typeof factory>;

    const _check: Inferred = { nome: "test", capacidade: 42 };
    expect(_check.nome).toBe("test");
  });
});
