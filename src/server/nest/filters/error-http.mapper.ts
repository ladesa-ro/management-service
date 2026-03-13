import {
  ApplicationError,
  ApplicationErrorCode,
  DomainError,
  DomainErrorCode,
  ValidationError,
  type ValidationErrorDetail,
} from "@/modules/@shared";

/**
 * Resposta HTTP padronizada para erros.
 */
export interface HttpErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  timestamp: string;
  path: string;
  details?: ValidationErrorDetail[];
}

/**
 * Mapeamento de código de erro de aplicação para status HTTP.
 */
const APPLICATION_ERROR_STATUS_MAP: Record<ApplicationErrorCode, number> = {
  [ApplicationErrorCode.RESOURCE_NOT_FOUND]: 404,
  [ApplicationErrorCode.FORBIDDEN]: 403,
  [ApplicationErrorCode.UNAUTHORIZED]: 401,
  [ApplicationErrorCode.VALIDATION]: 422,
  [ApplicationErrorCode.CONFLICT]: 409,
  [ApplicationErrorCode.INTERNAL]: 500,
};

/**
 * Mapeamento de código de erro de domínio para status HTTP.
 */
const DOMAIN_ERROR_STATUS_MAP: Record<DomainErrorCode, number> = {
  [DomainErrorCode.ENTITY_VALIDATION]: 422,
  [DomainErrorCode.BUSINESS_RULE_VIOLATION]: 422,
  [DomainErrorCode.INVALID_STATE]: 422,
  [DomainErrorCode.INVARIANT_VIOLATION]: 422,
};

/**
 * Traduz erro de aplicação para status HTTP.
 */
export function getHttpStatusFromApplicationError(error: ApplicationError): number {
  return APPLICATION_ERROR_STATUS_MAP[error.code] ?? 500;
}

/**
 * Traduz erro de domínio para status HTTP.
 */
export function getHttpStatusFromDomainError(error: DomainError): number {
  return DOMAIN_ERROR_STATUS_MAP[error.code] ?? 400;
}

/**
 * Traduz qualquer erro do core para status HTTP.
 */
export function getHttpStatusFromError(error: ApplicationError | DomainError): number {
  if (error instanceof ApplicationError) {
    return getHttpStatusFromApplicationError(error);
  }
  return getHttpStatusFromDomainError(error);
}

/**
 * Constrói a resposta HTTP padronizada a partir de um erro de aplicação.
 */
export function buildHttpErrorResponse(
  error: ApplicationError | DomainError,
  path: string,
): HttpErrorResponse {
  const statusCode = getHttpStatusFromError(error);

  const response: HttpErrorResponse = {
    statusCode,
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString(),
    path,
  };

  // Adiciona detalhes de validação se disponíveis
  if (error instanceof ValidationError) {
    response.details = error.details;
  }

  return response;
}
