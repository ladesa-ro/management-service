import { z } from "zod";
import { createSchema } from "../../create-schema";

export const UuidSchema = createSchema(() =>
  z.preprocess((value) => {
    if (value === null || value === undefined) return value;

    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed === "" ? value : trimmed;
    }

    return value;
  }, z.string().uuid()),
);
