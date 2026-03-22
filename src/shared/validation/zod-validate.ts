import type { z } from "zod";
import { EntityValidationError } from "@/domain/errors";
import type { IValidationErrorDetail } from "@/domain/validation";

export function zodValidate<T extends z.ZodType>(
  entityName: string,
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details: IValidationErrorDetail[] = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      rule: issue.code,
    }));

    throw new EntityValidationError(entityName, details);
  }

  return result.data;
}
