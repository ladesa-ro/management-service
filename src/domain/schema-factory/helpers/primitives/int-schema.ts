import { z } from "zod";
import { createSchema } from "../../create-schema";
import { NumberSchema } from "./number-schema";

export const IntSchema = createSchema((standard) =>
  NumberSchema.create(standard).pipe(z.number().int()),
);
