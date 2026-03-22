import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Response } from "express";
import type { HttpErrorResponse } from "./error-http.mapper";
import { buildValidationMessage, extractZodErrors } from "./utils";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const hostType = host.getType<"http" | "graphql">();

    if (hostType !== "http") {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url: string }>();

    const exceptionResponse = exception.getResponse();
    const details = extractZodErrors(exceptionResponse);

    if (details.length === 0) {
      const errorResponse: HttpErrorResponse = {
        statusCode: 400,
        code: "HTTP.BAD_REQUEST",
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(400).json(errorResponse);
      return;
    }

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
