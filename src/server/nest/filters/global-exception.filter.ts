import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  Inject,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { ILoggerPort } from "@/domain/abstractions/logging";
import { ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import type { HttpErrorResponse } from "./error-http.mapper";
import { getHttpStatusName } from "./utils";

/**
 * Filtro global que captura exceções não tratadas
 * e as traduz para respostas HTTP padronizadas.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(ILoggerPortToken)
    private readonly logger: ILoggerPort,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, request, response);
    }

    this.handleUnknownException(exception, request, response);
  }

  private handleHttpException(
    exception: HttpException,
    request: Request,
    response: Response,
  ): void {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse: HttpErrorResponse = {
      statusCode: status,
      code: `HTTP.${getHttpStatusName(status)}`,
      message: typeof exceptionResponse === "string" ? exceptionResponse : exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }

  private handleUnknownException(exception: unknown, request: Request, response: Response): void {
    const correlationId = request.correlationId;

    this.logger.error(
      "Unhandled exception",
      exception instanceof Error ? exception.stack : String(exception),
      "GlobalExceptionFilter",
      { path: request.url, correlationId },
    );

    const errorResponse: HttpErrorResponse = {
      statusCode: 500,
      code: "HTTP.INTERNAL_SERVER_ERROR",
      message: "Ocorreu um erro interno. Tente novamente mais tarde.",
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(500).json(errorResponse);
  }
}
