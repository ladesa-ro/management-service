/**
 * Códigos de erro de aplicação.
 */
export enum ApplicationErrorCode {
  RESOURCE_NOT_FOUND = "APP.RESOURCE_NOT_FOUND",
  FORBIDDEN = "APP.FORBIDDEN",
  UNAUTHORIZED = "APP.UNAUTHORIZED",
  VALIDATION = "APP.VALIDATION",
  CONFLICT = "APP.CONFLICT",
  INTERNAL = "APP.INTERNAL",
}

/**
 * Classe base para todos os erros de aplicação.
 * Erros de aplicação representam falhas em casos de uso.
 */
export abstract class ApplicationError extends Error {
  abstract readonly code: ApplicationErrorCode;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Recurso não encontrado.
 */
export class ResourceNotFoundError extends ApplicationError {
  readonly code = ApplicationErrorCode.RESOURCE_NOT_FOUND;

  constructor(
    readonly resource: string,
    readonly identifier?: string | number,
  ) {
    const idPart = identifier !== undefined ? ` com identificador "${identifier}"` : "";
    super(`${resource}${idPart} não encontrado(a).`);
  }
}

/**
 * Acesso negado ao recurso.
 */
export class ForbiddenError extends ApplicationError {
  readonly code = ApplicationErrorCode.FORBIDDEN;

  constructor(
    message = "Você não tem permissão para acessar este recurso.",
    readonly requiredPermission?: string,
  ) {
    super(message);
  }
}

/**
 * Usuário não autenticado.
 */
export class UnauthorizedError extends ApplicationError {
  readonly code = ApplicationErrorCode.UNAUTHORIZED;

  constructor(message = "Autenticação necessária para acessar este recurso.") {
    super(message);
  }
}

/**
 * Detalhe de um erro de validação em um campo específico.
 */
export interface ValidationErrorDetail {
  field: string;
  message: string;
  rule?: string;
  value?: unknown;
}

/**
 * Dados de entrada inválidos.
 */
export class ValidationError extends ApplicationError {
  readonly code = ApplicationErrorCode.VALIDATION;

  constructor(
    readonly details: ValidationErrorDetail[],
    message?: string,
  ) {
    super(message ?? ValidationError.buildMessage(details));
  }

  static fromField(
    field: string,
    message: string,
    rule?: string,
    value?: unknown,
  ): ValidationError {
    return new ValidationError([{ field, message, rule, value }]);
  }

  static fromFields(details: ValidationErrorDetail[]): ValidationError {
    return new ValidationError(details);
  }

  private static buildMessage(details: ValidationErrorDetail[]): string {
    if (details.length === 0) {
      return "Erro de validação nos dados de entrada.";
    }

    if (details.length === 1) {
      return `Erro de validação: ${details[0].message}`;
    }

    return `Erro de validação em ${details.length} campo(s).`;
  }
}

/**
 * Conflito com estado atual do recurso.
 */
export class ConflictError extends ApplicationError {
  readonly code = ApplicationErrorCode.CONFLICT;

  constructor(
    message: string,
    readonly conflictingResource?: string,
  ) {
    super(message);
  }
}

/**
 * Erro interno da aplicação.
 */
export class InternalError extends ApplicationError {
  readonly code = ApplicationErrorCode.INTERNAL;

  constructor(
    message = "Ocorreu um erro interno. Tente novamente mais tarde.",
    readonly cause?: Error,
  ) {
    super(message);
  }
}
