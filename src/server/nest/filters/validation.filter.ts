import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
} from "@nestjs/common";
import type { GqlContextType } from "@nestjs/graphql";
import type { Response } from "express";
import { buildStandardizedErrorResponse } from "./error-response.mapper";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === "graphql") {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url: string }>();

    const errorResponse = buildStandardizedErrorResponse(exception, request.url);
    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
