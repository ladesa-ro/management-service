import {
  BusinessRuleViolationError,
  DomainError,
  DomainErrorCode,
  EntityValidationError,
  InvalidStateError,
  InvariantViolationError,
} from "../../domain";
import { ConflictError, InternalError, ValidationError } from "./application.error";

/**
 * Converte erros de domínio para erros de aplicação apropriados.
 * Usado pelos casos de uso para traduzir erros de domínio.
 */
export class DomainErrorHandler {
  /**
   * Converte um DomainError para o ApplicationError correspondente
   */
  static toApplicationError(error: DomainError): ValidationError | ConflictError | InternalError {
    switch (error.code) {
      case DomainErrorCode.ENTITY_VALIDATION:
        return this.handleEntityValidation(error as EntityValidationError);

      case DomainErrorCode.BUSINESS_RULE_VIOLATION:
        return this.handleBusinessRuleViolation(error as BusinessRuleViolationError);

      case DomainErrorCode.INVALID_STATE:
        return this.handleInvalidState(error as InvalidStateError);

      case DomainErrorCode.INVARIANT_VIOLATION:
        return this.handleInvariantViolation(error as InvariantViolationError);

      default:
        return new InternalError(error.message, error);
    }
  }

  /**
   * Verifica se um erro é um DomainError
   */
  static isDomainError(error: unknown): error is DomainError {
    return error instanceof DomainError;
  }

  /**
   * Executa uma operação e converte erros de domínio automaticamente
   */
  static async handle<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (this.isDomainError(error)) {
        throw this.toApplicationError(error);
      }
      throw error;
    }
  }

  /**
   * Versão síncrona do handle
   */
  static handleSync<T>(operation: () => T): T {
    try {
      return operation();
    } catch (error) {
      if (this.isDomainError(error)) {
        throw this.toApplicationError(error);
      }
      throw error;
    }
  }

  // ========================================
  // Handlers específicos por tipo de erro
  // ========================================

  private static handleEntityValidation(error: EntityValidationError): ValidationError {
    return new ValidationError(
      error.details.map((d) => ({
        field: d.field,
        message: d.message,
        rule: d.rule,
        value: d.value,
      })),
      error.message,
    );
  }

  private static handleBusinessRuleViolation(error: BusinessRuleViolationError): ConflictError {
    return new ConflictError(error.message, error.rule);
  }

  private static handleInvalidState(error: InvalidStateError): ConflictError {
    return new ConflictError(error.message, error.entity);
  }

  private static handleInvariantViolation(error: InvariantViolationError): ConflictError {
    return new ConflictError(error.message, error.invariant);
  }
}

/**
 * Decorator para métodos de use case que devem converter erros de domínio
 */
export function HandleDomainErrors() {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      return DomainErrorHandler.handle(() => originalMethod.apply(this, args));
    };

    return descriptor;
  };
}
