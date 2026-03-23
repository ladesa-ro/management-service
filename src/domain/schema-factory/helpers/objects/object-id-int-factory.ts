import { z } from "zod";
import { createSchema } from "../../create-schema";
import { IdIntSchema } from "../primitives/id-int-schema";
import { objectIdPreprocess } from "../utils";

export const ObjectIdIntFactory = createSchema((standard) => {
  const schema = z.object({ id: IdIntSchema.create(standard) });

  if (!standard.coerce) return schema;

  return z.preprocess(objectIdPreprocess, schema.nullable());
});
