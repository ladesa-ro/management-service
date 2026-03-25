import { BadRequestException, HttpException } from "@nestjs/common";
import {
  ApplicationError,
  ApplicationErrorCode,
  ValidationError,
  type ValidationErrorDetail,
} from "@/application/errors";
import {
  DomainError,
  DomainErrorCode,
  EntityValidationError,
  PrimitiveException,
} from "@/domain/errors";
import { getNowISO } from "@/utils/date";
import { buildValidationMessage, extractZodErrors, getHttpStatusName } from "./utils";

/**
 * Resposta padronizada para erros (usada em REST e GraphQL).
 */
export interface StandardizedErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  details?: ValidationErrorDetail[];
}

const APPLICATION_ERROR_STATUS_MAP: Record<ApplicationErrorCode, number> = {
  [ApplicationErrorCode.RESOURCE_NOT_FOUND]: 404,
  [ApplicationErrorCode.FORBIDDEN]: 403,
  [ApplicationErrorCode.UNAUTHORIZED]: 401,
  [ApplicationErrorCode.VALIDATION]: 422,
  [ApplicationErrorCode.CONFLICT]: 409,
  [ApplicationErrorCode.GONE]: 410,
  [ApplicationErrorCode.INTERNAL]: 500,
  [ApplicationErrorCode.SERVICE_UNAVAILABLE]: 503,
};

const DOMAIN_ERROR_STATUS_MAP: Record<DomainErrorCode, number> = {
  [DomainErrorCode.ENTITY_VALIDATION]: 422,
  [DomainErrorCode.BUSINESS_RULE_VIOLATION]: 422,
  [DomainErrorCode.INVALID_STATE]: 422,
  [DomainErrorCode.INVARIANT_VIOLATION]: 422,
};

function getHttpStatusFromError(error: ApplicationError | DomainError): number {
  if (error instanceof ApplicationError) {
    return APPLICATION_ERROR_STATUS_MAP[error.code] ?? 500;
  }
  return DOMAIN_ERROR_STATUS_MAP[(error as DomainError).code] ?? 400;
}

/**
 * Constrói resposta padronizada a partir de um erro de domínio ou aplicação.
 */
function buildErrorResponse(
  error: ApplicationError | DomainError,
  path?: string,
): StandardizedErrorResponse {
  const statusCode = getHttpStatusFromError(error);

  const response: StandardizedErrorResponse = {
    statusCode,
    code: error.code,
    message: error.message,
    timestamp: getNowISO(),
    path,
  };

  if (error instanceof ValidationError) {
    response.details = error.details;
  }

  if (error instanceof EntityValidationError) {
    response.details = error.details.map((d) => ({
      field: d.field,
      message: d.message,
      rule: d.rule,
      value: d.value,
    }));
  }

  return response;
}

/**
 * Constrói a resposta padronizada a partir de qualquer exceção.
 * Função centralizada usada por REST (filters) e GraphQL (formatError).
 */
export function buildStandardizedErrorResponse(
  exception: unknown,
  path?: string,
): StandardizedErrorResponse {
  if (exception instanceof PrimitiveException) {
    return buildErrorResponse(exception as ApplicationError | DomainError, path);
  }

  if (exception instanceof BadRequestException) {
    const exceptionResponse = exception.getResponse();
    const details = extractZodErrors(exceptionResponse);

    if (details.length > 0) {
      return {
        statusCode: 422,
        code: "APP.VALIDATION",
        message: buildValidationMessage(details),
        timestamp: getNowISO(),
        path,
        details,
      };
    }

    return {
      statusCode: 400,
      code: "HTTP.BAD_REQUEST",
      message: exception.message,
      timestamp: getNowISO(),
      path,
    };
  }

  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    return {
      statusCode: status,
      code: `HTTP.${getHttpStatusName(status)}`,
      message: typeof exceptionResponse === "string" ? exceptionResponse : exception.message,
      timestamp: getNowISO(),
      path,
    };
  }

  return {
    statusCode: 500,
    code: "HTTP.INTERNAL_SERVER_ERROR",
    message: "Ocorreu um erro interno. Tente novamente mais tarde.",
    timestamp: getNowISO(),
    path,
  };
}
