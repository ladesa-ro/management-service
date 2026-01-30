import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { HttpErrorResponse } from "./error-http.mapper";

/**
 * Filtro global que captura exceções não tratadas
 * e as traduz para respostas HTTP padronizadas.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // HttpException do NestJS (exceto BadRequestException que é tratado pelo ValidationExceptionFilter)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse: HttpErrorResponse = {
        statusCode: status,
        code: `HTTP.${this.getHttpCodeName(status)}`,
        message: typeof exceptionResponse === "string" ? exceptionResponse : exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      return response.status(status).json(errorResponse);
    }

    // Erro não tratado - log e resposta genérica
    this.logger.error("Unhandled exception:", exception);

    const errorResponse: HttpErrorResponse = {
      statusCode: 500,
      code: "HTTP.INTERNAL_SERVER_ERROR",
      message: "Ocorreu um erro interno. Tente novamente mais tarde.",
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(500).json(errorResponse);
  }

  private getHttpCodeName(status: number): string {
    const statusNames: Record<number, string> = {
      400: "BAD_REQUEST",
      401: "UNAUTHORIZED",
      403: "FORBIDDEN",
      404: "NOT_FOUND",
      405: "METHOD_NOT_ALLOWED",
      408: "REQUEST_TIMEOUT",
      409: "CONFLICT",
      410: "GONE",
      422: "UNPROCESSABLE_ENTITY",
      429: "TOO_MANY_REQUESTS",
      500: "INTERNAL_SERVER_ERROR",
      501: "NOT_IMPLEMENTED",
      502: "BAD_GATEWAY",
      503: "SERVICE_UNAVAILABLE",
      504: "GATEWAY_TIMEOUT",
    };

    return statusNames[status] ?? "UNKNOWN_ERROR";
  }
}
