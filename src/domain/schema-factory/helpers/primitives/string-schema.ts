import { z } from "zod";
import { createSchema } from "../../create-schema";
import type { ExtraSchemaOptions } from "../../schema-options";

export type StringExtra = ExtraSchemaOptions & {
  trim?: boolean;
};

export const StringSchema = createSchema<z.ZodTypeAny, StringExtra>((_standard, extra) => {
  const base = z.string();
  if (extra?.trim === false) return base;
  return base.trim();
});
