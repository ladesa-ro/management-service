import type { z } from "zod";
import { SchemaFactory, type SchemaFactoryFn } from "./schema-factory";
import type { ExtraSchemaOptions } from "./schema-options";

export function createSchema<
  TSchema extends z.ZodTypeAny,
  TExtra extends ExtraSchemaOptions = ExtraSchemaOptions,
>(factory: SchemaFactoryFn<TSchema, TExtra>): SchemaFactory<TSchema, TExtra> {
  return new SchemaFactory(factory);
}

export type InferSchemaFactory<T> = T extends SchemaFactory<infer S, infer _E> ? z.infer<S> : never;
