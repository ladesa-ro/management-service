import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { ValidationErrorDetail } from "@/modules/@shared";
import type { HttpErrorResponse } from "./error-http.mapper";
import {
  buildValidationMessage,
  extractClassValidatorErrors,
  extractFieldFromMessage,
  extractStringMessages,
  parseClassValidatorErrors,
} from "./utils";

/**
 * Filtro que captura BadRequestException do ValidationPipe
 * e traduz para o formato padronizado com status 422.
 */
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse();
    const details = this.extractValidationDetails(exceptionResponse);

    if (details.length === 0) {
      return this.sendBadRequestResponse(response, request, exception);
    }

    this.sendValidationResponse(response, request, details);
  }

  private extractValidationDetails(exceptionResponse: unknown): ValidationErrorDetail[] {
    const classValidatorErrors = extractClassValidatorErrors(exceptionResponse);
    if (classValidatorErrors) {
      return parseClassValidatorErrors(classValidatorErrors);
    }

    const stringMessages = extractStringMessages(exceptionResponse);
    if (stringMessages) {
      return stringMessages.map((msg) => ({
        field: extractFieldFromMessage(msg),
        message: msg,
      }));
    }

    return [];
  }

  private sendBadRequestResponse(
    response: Response,
    request: Request,
    exception: BadRequestException,
  ): void {
    const errorResponse: HttpErrorResponse = {
      statusCode: 400,
      code: "HTTP.BAD_REQUEST",
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(400).json(errorResponse);
  }

  private sendValidationResponse(
    response: Response,
    request: Request,
    details: ValidationErrorDetail[],
  ): void {
    const errorResponse: HttpErrorResponse = {
      statusCode: 422,
      code: "APP.VALIDATION",
      message: buildValidationMessage(details),
      timestamp: new Date().toISOString(),
      path: request.url,
      details,
    };
    response.status(422).json(errorResponse);
  }
}
