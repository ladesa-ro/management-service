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
 */
export class EntityValidationError extends DomainError {
  readonly code = DomainErrorCode.ENTITY_VALIDATION;

  constructor(
    readonly entity: string,
    readonly field: string,
    readonly reason: string,
  ) {
    super(`[${entity}] Campo "${field}": ${reason}`);
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
