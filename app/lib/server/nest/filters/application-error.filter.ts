import { type ArgumentsHost, Catch, type ExceptionFilter } from "@nestjs/common";
import type { Request, Response } from "express";
import { ApplicationError, DomainError } from "@/core/@shared";
import { buildHttpErrorResponse } from "./error-http.mapper";

/**
 * Filtro que captura erros de aplicação e domínio do core
 * e os traduz para respostas HTTP padronizadas.
 */
@Catch(ApplicationError, DomainError)
export class ApplicationErrorFilter implements ExceptionFilter {
  catch(exception: ApplicationError | DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = buildHttpErrorResponse(exception, request.url);

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
