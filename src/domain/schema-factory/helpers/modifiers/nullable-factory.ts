import type { z } from "zod";
import { createSchema } from "../../create-schema";
import type { SchemaFactory } from "../../schema-factory";

export function NullableFactory<TSchema extends z.ZodTypeAny>(
  factory: SchemaFactory<TSchema>,
): SchemaFactory<z.ZodNullable<TSchema>> {
  return createSchema((standard, extra) =>
    factory.create(standard, extra).nullable(),
  ) as SchemaFactory<z.ZodNullable<TSchema>>;
}
