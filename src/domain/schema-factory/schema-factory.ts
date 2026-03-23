import { z } from "zod";
import { buildCacheKey } from "./cache-key";
import {
  DOMAIN_OPTIONS,
  type ExtraSchemaOptions,
  PRESENTATION_OPTIONS,
  type StandardSchemaOptions,
} from "./schema-options";

export type SchemaFactoryFn<TSchema, TExtra> = (
  standard: StandardSchemaOptions,
  extra?: TExtra,
) => TSchema;

export class SchemaFactory<
  TSchema extends z.ZodTypeAny = z.ZodTypeAny,
  TExtra extends ExtraSchemaOptions = ExtraSchemaOptions,
> {
  private readonly cache = new Map<string, TSchema>();

  constructor(private readonly factory: SchemaFactoryFn<TSchema, TExtra>) {}

  create(standard: StandardSchemaOptions, extra?: TExtra): TSchema {
    const key = buildCacheKey(standard, extra);

    const cached = this.cache.get(key);

    if (cached) {
      return cached;
    }

    let schema = this.factory(standard, extra);

    if (standard.strict && schema instanceof z.ZodObject) {
      schema = schema.strict() as unknown as TSchema;
    }

    this.cache.set(key, schema);

    return schema;
  }

  get domain(): TSchema {
    return this.create(DOMAIN_OPTIONS);
  }

  get presentation(): TSchema {
    return this.create(PRESENTATION_OPTIONS);
  }
}
