import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { HttpErrorResponse } from "./error-http.mapper";
import { getHttpStatusName } from "./utils";

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
}
