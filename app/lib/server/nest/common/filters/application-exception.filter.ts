import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";
import {
  ApplicationError,
  ApplicationErrorCode,
  ConflictError,
  ForbiddenError,
  InternalError,
  ResourceNotFoundError,
  ValidationError,
} from "@/modules/@shared/application";

/**
 * Estrutura padrão de resposta de erro
 */
interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  code: string;
  details?: unknown;
  timestamp: string;
  path: string;
}

/**
 * Exception filter para erros de aplicação.
 * Converte ApplicationError em respostas HTTP apropriadas.
 */
@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApplicationExceptionFilter.name);

  catch(exception: ApplicationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const { status, error } = this.mapApplicationError(exception);

    const errorResponse: ErrorResponse = {
      statusCode: status,
      error,
      message: exception.message,
      code: exception.code,
      details: this.extractDetails(exception),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log diferenciado por tipo de erro
    if (status >= 500) {
      this.logger.error(
        `Application error: ${exception.code} - ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.warn(`Application error: ${exception.code} - ${exception.message}`);
    }

    response.status(status).json(errorResponse);
  }

  private mapApplicationError(error: ApplicationError): { status: HttpStatus; error: string } {
    switch (error.code) {
      case ApplicationErrorCode.RESOURCE_NOT_FOUND:
        return { status: HttpStatus.NOT_FOUND, error: "Not Found" };

      case ApplicationErrorCode.FORBIDDEN:
        return { status: HttpStatus.FORBIDDEN, error: "Forbidden" };

      case ApplicationErrorCode.UNAUTHORIZED:
        return { status: HttpStatus.UNAUTHORIZED, error: "Unauthorized" };

      case ApplicationErrorCode.VALIDATION:
        return { status: HttpStatus.BAD_REQUEST, error: "Bad Request" };

      case ApplicationErrorCode.CONFLICT:
        return { status: HttpStatus.CONFLICT, error: "Conflict" };

      case ApplicationErrorCode.INTERNAL:
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: "Internal Server Error" };

      default:
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: "Internal Server Error" };
    }
  }

  private extractDetails(error: ApplicationError): unknown {
    if (error instanceof ResourceNotFoundError) {
      return {
        resource: error.resource,
        identifier: error.identifier,
      };
    }

    if (error instanceof ForbiddenError) {
      return {
        requiredPermission: error.requiredPermission,
      };
    }

    if (error instanceof ValidationError) {
      return {
        validationErrors: error.details,
      };
    }

    if (error instanceof ConflictError) {
      return {
        conflictingResource: error.conflictingResource,
      };
    }

    if (error instanceof InternalError) {
      // Não expõe detalhes internos em produção
      return undefined;
    }

    return undefined;
  }
}
