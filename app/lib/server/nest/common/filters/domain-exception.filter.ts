import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";
import {
  BusinessRuleViolationError,
  DomainError,
  DomainErrorCode,
  EntityValidationError,
  InvalidStateError,
  InvariantViolationError,
} from "@/modules/@shared/domain";

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
 * Exception filter para erros de domínio.
 * Converte DomainError em respostas HTTP apropriadas.
 */
@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const { status, error } = this.mapDomainError(exception);

    const errorResponse: ErrorResponse = {
      statusCode: status,
      error,
      message: exception.message,
      code: exception.code,
      details: this.extractDetails(exception),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.warn(`Domain error: ${exception.code} - ${exception.message}`, exception.stack);

    response.status(status).json(errorResponse);
  }

  private mapDomainError(error: DomainError): { status: HttpStatus; error: string } {
    switch (error.code) {
      case DomainErrorCode.ENTITY_VALIDATION:
        return { status: HttpStatus.BAD_REQUEST, error: "Bad Request" };

      case DomainErrorCode.BUSINESS_RULE_VIOLATION:
        return { status: HttpStatus.UNPROCESSABLE_ENTITY, error: "Unprocessable Entity" };

      case DomainErrorCode.INVALID_STATE:
        return { status: HttpStatus.CONFLICT, error: "Conflict" };

      case DomainErrorCode.INVARIANT_VIOLATION:
        return { status: HttpStatus.CONFLICT, error: "Conflict" };

      default:
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: "Internal Server Error" };
    }
  }

  private extractDetails(error: DomainError): unknown {
    if (error instanceof EntityValidationError) {
      return {
        entity: error.entity,
        validationErrors: error.details,
      };
    }

    if (error instanceof BusinessRuleViolationError) {
      return {
        rule: error.rule,
        reason: error.reason,
      };
    }

    if (error instanceof InvalidStateError) {
      return {
        entity: error.entity,
        currentState: error.currentState,
        expectedState: error.expectedState,
      };
    }

    if (error instanceof InvariantViolationError) {
      return {
        invariant: error.invariant,
        reason: error.reason,
      };
    }

    return undefined;
  }
}
