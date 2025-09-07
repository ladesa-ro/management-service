import { type ArgumentsHost, Catch, HttpException, UnprocessableEntityException } from "@nestjs/common";
import type { Request, Response } from "express";
import {
  BaseApplicationError,
  BaseForbiddenError,
  BaseNotFoundError,
  BaseValidationFailedError,
} from "@/shared/base-entity/application/errors";
import { PrimitiveError } from "@/shared/primitives";

type IStandardResponseError = {
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
} & Record<string, any>;

@Catch()
export class AppExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    // const isGql = !request;
    // const gqlHost = GqlArgumentsHost.create(host);

    const standardResponseErrorBase = {
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    let standardResponseError: IStandardResponseError = {
      statusCode: 500,
      message: "Internal Server Error",
      ...standardResponseErrorBase,
    };

    if (exception instanceof HttpException) {
      standardResponseError.message = exception.message;
      standardResponseError.statusCode = exception.getStatus();

      const response = exception.getResponse();

      if (exception instanceof UnprocessableEntityException) {
        standardResponseError.errors = response;
      }
    } else if (exception instanceof PrimitiveError) {
      standardResponseError.message = exception.message;

      if (exception instanceof BaseValidationFailedError) {
        standardResponseError.errors = exception.errors;
      } else if (exception instanceof BaseForbiddenError) {
        standardResponseError.statusCode = 403;
      } else if (exception instanceof BaseNotFoundError) {
        standardResponseError.statusCode = 404;
      } else if (exception instanceof BaseApplicationError) {
        standardResponseError.statusCode = 400;
      }
    }

    if (standardResponseError.statusCode >= 500) {
      console.error({standardResponseError, exception});
    }

    response.status(standardResponseError.statusCode).json(standardResponseError);

  }
}
