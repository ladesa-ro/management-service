import type { ScalarDateTimeString } from "@/domain/abstractions/scalars/scalar-date-time-string.js";
import { EntityValidationError } from "@/modules/@shared/domain/errors/domain.error.js";
import type { ValidationResult } from "@/modules/@shared/domain/validation/validation-result.js";
import {
  createValidator,
  type ValidationRules,
} from "@/modules/@shared/domain/validation/validation-rules.js";

export type { ValidationResult, ValidationRules };
export { createValidator };

export function throwIfInvalid(entityName: string, result: ValidationResult): void {
  if (result.hasErrors) {
    throw EntityValidationError.fromValidationResult(entityName, result);
  }
}

export function touchUpdated(entity: { dateUpdated: ScalarDateTimeString }): void {
  entity.dateUpdated = new Date().toISOString();
}
