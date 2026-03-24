import { type ArgumentsHost, Catch, type ExceptionFilter, Inject } from "@nestjs/common";
import { GqlArgumentsHost, GqlContextType } from "@nestjs/graphql";
import type { Request, Response } from "express";
import type { ILoggerPort } from "@/domain/abstractions/logging";
import { ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { buildStandardizedErrorResponse } from "./error-response.mapper";

/**
 * Filtro global que captura exceções não tratadas
 * e as traduz para respostas padronizadas.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(ILoggerPortToken)
    private readonly logger: ILoggerPort,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const isGraphql = host.getType<GqlContextType>() === "graphql";

    const request: Request | undefined = isGraphql
      ? GqlArgumentsHost.create(host).getContext().req
      : host.switchToHttp().getRequest<Request>();

    // Browsers request /favicon.ico automatically — respond 204 silently
    if (!isGraphql && request?.url === "/favicon.ico") {
      host.switchToHttp().getResponse<Response>().status(204).end();
      return;
    }

    this.logException(exception, request);

    if (isGraphql) {
      throw exception;
    }

    const response = host.switchToHttp().getResponse<Response>();
    const errorResponse = buildStandardizedErrorResponse(exception, request?.url);
    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private logException(exception: unknown, request: Request | undefined): void {
    const correlationId = request?.correlationId;

    this.logger.error(
      "Unhandled exception",
      exception instanceof Error ? exception.stack : String(exception),
      "GlobalExceptionFilter",
      { path: request?.url, correlationId },
    );
  }
}
