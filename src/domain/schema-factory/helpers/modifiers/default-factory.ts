import type { z } from "zod";
import { createSchema } from "../../create-schema";
import type { SchemaFactory } from "../../schema-factory";

export function DefaultFactory<TSchema extends z.ZodTypeAny>(
  factory: SchemaFactory<TSchema>,
  value: unknown,
): SchemaFactory {
  return createSchema((standard, extra) => factory.create(standard, extra).default(value as never));
}
