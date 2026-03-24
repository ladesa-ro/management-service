import { z } from "zod";
import { createSchema } from "../../create-schema";
import { UuidSchema } from "../primitives/uuid-schema";
import { objectIdPreprocess } from "../utils";

export const ObjectIdUuidFactory = createSchema((standard) => {
  const schema = z.object({ id: UuidSchema.create(standard) });

  if (!standard.coerce) return schema;

  return z.preprocess(objectIdPreprocess, schema) as unknown as typeof schema;
});

export const ObjectIdUuidFactoryNullable = createSchema((standard) => {
  const schema = z.object({ id: UuidSchema.create(standard) }).nullable();

  if (!standard.coerce) return schema;

  return z.preprocess(objectIdPreprocess, schema) as unknown as typeof schema;
});
