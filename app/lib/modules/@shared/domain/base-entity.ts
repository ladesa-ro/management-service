import { EntityValidationError } from "./errors";
import type { ScalarDateTimeString } from "./scalars.types";
import { createValidator, ValidationResult, ValidationRules } from "./validation";

/**
 * Classe base abstrata para entidades de domínio.
 * Fornece validação padronizada e métodos comuns para todas as entidades.
 */
export abstract class BaseEntity {
  abstract dateDeleted: ScalarDateTimeString | null;

  /**
   * Nome da entidade para mensagens de erro
   */
  protected static get entityName(): string {
    return this.name;
  }

  // ========================================
  // Métodos de Estado
  // ========================================

  /**
   * Cria um contexto de validação para a entidade
   */
  protected static createValidation(entityName?: string): {
    result: ValidationResult;
    rules: ValidationRules;
  } {
    return createValidator(entityName ?? this.entityName);
  }

  /**
   * Lança EntityValidationError se o resultado tiver erros
   */
  protected static throwIfInvalid(result: ValidationResult, entityName?: string): void {
    if (result.hasErrors) {
      throw EntityValidationError.fromValidationResult(entityName ?? this.entityName, result);
    }
  }

  /**
   * Valida e lança erro se inválido (combina createValidation + throwIfInvalid)
   * Retorna as rules para encadeamento
   */
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

  // ========================================
  // Métodos de Validação (para subclasses)
  // ========================================

  /**
   * Valida que um campo obrigatório está preenchido
   * @deprecated Use createValidation() e rules.required() em vez disso
   */
  protected static validateRequired(value: string | null | undefined, field: string): string {
    if (!value || value.trim().length === 0) {
      throw EntityValidationError.fromField(this.entityName, field, `${field} é obrigatório`);
    }
    return value.trim();
  }

  /**
   * Valida um campo opcional, retornando null se vazio
   * @deprecated Use createValidation() e rules.optional() em vez disso
   */
  protected static validateOptional(value: string | null | undefined): string | null {
    if (!value || value.trim().length === 0) {
      return null;
    }
    return value.trim();
  }

  /**
   * Verifica se a entidade está ativa (não deletada)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  // ========================================
  // Helpers de Validação (legado - compatibilidade)
  // ========================================

  /**
   * Verifica se a entidade pode ser editada
   */
  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  /**
   * Verifica se a entidade pode ser deletada
   */
  podeSerDeletado(): boolean {
    return this.isAtivo();
  }
}
