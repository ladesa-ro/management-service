import { EntityValidationError } from "./errors";
import { createValidator, ValidationResult, ValidationRules } from "./validation";

/**
 * Classe base abstrata para todas as entidades de domínio.
 * Fornece validação padronizada.
 */
export abstract class BaseEntity {
  protected static get entityName(): string {
    return this.name;
  }

  // ========================================
  // Métodos Abstratos
  // ========================================

  abstract validar(): void;

  // ========================================
  // Métodos de Validação
  // ========================================

  protected static createValidation(entityName?: string): {
    result: ValidationResult;
    rules: ValidationRules;
  } {
    return createValidator(entityName ?? this.entityName);
  }

  protected static throwIfInvalid(result: ValidationResult, entityName?: string): void {
    if (result.hasErrors) {
      throw EntityValidationError.fromValidationResult(entityName ?? this.entityName, result);
    }
  }

  protected static validate(
    entityName?: string,
    validator?: (rules: ValidationRules, result: ValidationResult) => void,
  ): ValidationRules {
    const { result, rules } = this.createValidation(entityName);
    if (validator) {
      validator(rules, result);
      this.throwIfInvalid(result, entityName);
    }
    return rules;
  }
}
