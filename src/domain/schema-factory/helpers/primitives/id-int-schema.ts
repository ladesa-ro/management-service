import { z } from "zod";
import { createSchema } from "../../create-schema";
import { numberPreprocess } from "./number-schema";

export const IdIntSchema = createSchema((standard) => {
  const base = z.number().int().positive();
  if (!standard.coerce) return base;
  return z.preprocess(numberPreprocess, base);
});
