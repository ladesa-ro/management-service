import { ValidationFailedException } from "@/application/standards";
import { type ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import type { GqlExceptionFilter as NestGqlExceptionFilter } from "@nestjs/graphql";
import type { Request, Response } from "express";

@Catch(HttpException)
export class GqlExceptionFilter implements NestGqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // const gqlHost = GqlArgumentsHost.create(host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    const isGql = !request;

    if (!isGql) {
      if (exception instanceof ValidationFailedException) {
        response.status(status).json(exception.getResponse());
      } else {
        const formattedErrorResponse = {
          statusCode: status,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };

        response.status(status).json(formattedErrorResponse);
      }
    }
  }

  // catch(exception: HttpException /*, host: ArgumentsHost */) {
  //   // const _gqlHost = GqlArgumentsHost.create(host);
  //   return exception;
  // }
}
