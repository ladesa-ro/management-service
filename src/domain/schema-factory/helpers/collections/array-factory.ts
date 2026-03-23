import { z } from "zod";
import { createSchema } from "../../create-schema";
import type { SchemaFactory } from "../../schema-factory";
import type { ExtraSchemaOptions } from "../../schema-options";

export type ArrayExtra = ExtraSchemaOptions & {
  element: SchemaFactory;
  min?: number;
  max?: number;
};

export const ArrayFactory = createSchema<z.ZodArray<z.ZodTypeAny>, ArrayExtra>(
  (standard, extra) => {
    if (!extra?.element) {
      throw new Error("ArrayFactory requires 'element' in extra.");
    }

    let array = z.array(extra.element.create(standard));

    if (extra.min !== undefined) {
      array = array.min(extra.min);
    }

    if (extra.max !== undefined) {
      array = array.max(extra.max);
    }

    return array;
  },
);
