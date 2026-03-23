import { z } from "zod";
import { createSchema } from "../../create-schema";

export const BooleanSchema = createSchema((standard) => {
  const base = z.boolean();

  if (!standard.coerce) return base;

  return z.preprocess((value) => {
    if (value === null || value === undefined) return value;
    if (typeof value === "boolean") return value;

    if (typeof value === "number") {
      if (value === 1) return true;
      if (value === 0) return false;
      return value;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized === "true" || normalized === "1") return true;
      if (normalized === "false" || normalized === "0") return false;
      return value;
    }

    return value;
  }, base);
});
