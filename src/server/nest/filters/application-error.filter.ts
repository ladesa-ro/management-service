import { type ArgumentsHost, Catch, type ExceptionFilter } from "@nestjs/common";
import type { GqlContextType } from "@nestjs/graphql";
import type { Request, Response } from "express";
import { ApplicationError } from "@/application/errors";
import { DomainError } from "@/domain/errors";
import { buildStandardizedErrorResponse } from "./error-response.mapper";

/**
 * Filtro que captura erros de aplicação e domínio do core
 * e os traduz para respostas padronizadas.
 */
@Catch(ApplicationError, DomainError)
export class ApplicationErrorFilter implements ExceptionFilter {
  catch(exception: ApplicationError | DomainError, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === "graphql") {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = buildStandardizedErrorResponse(exception, request.url);
    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
