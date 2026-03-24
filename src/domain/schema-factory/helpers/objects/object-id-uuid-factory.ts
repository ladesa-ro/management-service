import { z } from "zod";
import { createSchema } from "../../create-schema";
import { UuidSchema } from "../primitives/uuid-schema";
import { objectIdPreprocess } from "../utils";

export const ObjectIdUuidFactory = createSchema((standard) => {
  const schema = z.object({ id: UuidSchema.create(standard) });

  if (!standard.coerce) return schema;

  // Cast preserva tipo consistente para inferência. Em runtime, o preprocess + nullable
  // garante a coerção; em domain mode, o retorno é exatamente o schema não-nullable.
  return z.preprocess(objectIdPreprocess, schema.nullable()) as unknown as typeof schema;
});
