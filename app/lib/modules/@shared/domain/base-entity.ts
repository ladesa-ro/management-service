import { EntityValidationError } from "./errors";
import type { IdUuid, ScalarDateTimeString } from "./scalars.types";
import { createValidator, ValidationResult, ValidationRules } from "./validation";

/**
 * Classe base abstrata para entidades de domínio.
 * Fornece validação padronizada e métodos comuns para todas as entidades.
 */
export abstract class BaseEntity {
  abstract id: IdUuid;
  abstract dateCreated: ScalarDateTimeString;
  abstract dateUpdated: ScalarDateTimeString;
  abstract dateDeleted: ScalarDateTimeString | null;

  /**
   * Nome da entidade para mensagens de erro
   */
  protected static get entityName(): string {
    return this.name;
  }

  // ========================================
  // Métodos Abstratos
  // ========================================

  /**
   * Valida o estado atual da entidade.
   * Deve ser implementado por cada subclasse.
   */
  abstract validar(): void;

  // ========================================
  // Helpers de Datas
  // ========================================

  /**
   * Inicializa as datas para uma nova entidade
   */
  protected initDates(): void {
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  /**
   * Atualiza dateUpdated para o momento atual
   */
  protected touchUpdated(): void {
    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos de Validação
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
  // Métodos de Estado
  // ========================================

  /**
   * Verifica se a entidade está ativa (não deletada)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

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
