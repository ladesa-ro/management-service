import type { IValidationErrorDetail, ValidationResult } from "../validation";

/**
 * Códigos de erro de domínio.
 */
export enum DomainErrorCode {
  ENTITY_VALIDATION = "DOMAIN.ENTITY_VALIDATION",
  BUSINESS_RULE_VIOLATION = "DOMAIN.BUSINESS_RULE_VIOLATION",
  INVALID_STATE = "DOMAIN.INVALID_STATE",
  INVARIANT_VIOLATION = "DOMAIN.INVARIANT_VIOLATION",
}

/**
 * Classe base para todos os erros de domínio.
 * Erros de domínio representam violações de regras de negócio.
 */
export abstract class DomainError extends Error {
  abstract readonly code: DomainErrorCode;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Erro de validação de entidade de domínio.
 * Pode conter múltiplos erros de validação.
 */
export class EntityValidationError extends DomainError {
  readonly code = DomainErrorCode.ENTITY_VALIDATION;
  readonly details: readonly IValidationErrorDetail[];

  constructor(
    readonly entity: string,
    details: IValidationErrorDetail | readonly IValidationErrorDetail[],
  ) {
    const detailsArray = Array.isArray(details) ? details : [details];
    const message = EntityValidationError.buildMessage(entity, detailsArray);
    super(message);
    this.details = detailsArray;
  }

  /**
   * Cria um erro de validação a partir de um ValidationResult
   */
  static fromValidationResult(entity: string, result: ValidationResult): EntityValidationError {
    return new EntityValidationError(entity, result.errors);
  }

  /**
   * Cria um erro de validação para um único campo
   */
  static fromField(
    entity: string,
    field: string,
    message: string,
    rule?: string,
    value?: unknown,
  ): EntityValidationError {
    return new EntityValidationError(entity, { field, message, rule, value });
  }

  private static buildMessage(entity: string, details: readonly IValidationErrorDetail[]): string {
    if (details.length === 0) {
      return `[${entity}] Erro de validação`;
    }

    if (details.length === 1) {
      const d = details[0];
      return `[${entity}] Campo "${d.field}": ${d.message}`;
    }

    const fieldNames = details.map((d) => d.field).join(", ");
    return `[${entity}] Erros de validação nos campos: ${fieldNames}`;
  }

  /**
   * Retorna o primeiro detalhe de erro
   */
  get firstDetail(): IValidationErrorDetail | undefined {
    return this.details[0];
  }

  /**
   * Retorna o campo do primeiro erro (compatibilidade com versão anterior)
   */
  get field(): string {
    return this.details[0]?.field ?? "";
  }

  /**
   * Retorna a razão do primeiro erro (compatibilidade com versão anterior)
   */
  get reason(): string {
    return this.details[0]?.message ?? "";
  }
}

/**
 * Erro de regra de negócio violada.
 */
export class BusinessRuleViolationError extends DomainError {
  readonly code = DomainErrorCode.BUSINESS_RULE_VIOLATION;

  constructor(
    readonly rule: string,
    readonly reason: string,
  ) {
    super(`Regra de negócio "${rule}" violada: ${reason}`);
  }
}

/**
 * Erro de estado inválido da entidade.
 */
export class InvalidStateError extends DomainError {
  readonly code = DomainErrorCode.INVALID_STATE;

  constructor(
    readonly entity: string,
    readonly currentState: string,
    readonly expectedState: string,
  ) {
    super(`[${entity}] Estado inválido: esperado "${expectedState}", atual "${currentState}"`);
  }
}

/**
 * Erro de invariante violada.
 */
export class InvariantViolationError extends DomainError {
  readonly code = DomainErrorCode.INVARIANT_VIOLATION;

  constructor(
    readonly invariant: string,
    readonly reason: string,
  ) {
    super(`Invariante "${invariant}" violada: ${reason}`);
  }
}
