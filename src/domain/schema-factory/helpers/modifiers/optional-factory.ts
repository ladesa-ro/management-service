import type { z } from "zod";
import { createSchema } from "../../create-schema";
import type { SchemaFactory } from "../../schema-factory";

export function OptionalFactory<TSchema extends z.ZodTypeAny>(
  factory: SchemaFactory<TSchema>,
): SchemaFactory<z.ZodOptional<TSchema>> {
  return createSchema((standard, extra) =>
    factory.create(standard, extra).optional(),
  ) as SchemaFactory<z.ZodOptional<TSchema>>;
}
