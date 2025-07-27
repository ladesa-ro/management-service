import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request as ExpressRequest } from "express";
import { IApiDocOperationKey } from "@/application/contracts/integration/poc/openapi-doc";
import { requestValidateAndParse } from "@/application/contracts/openapi/utils/request-validate-and-parse";
import { IAppRequestRepresentationGeneric } from "@/application/interfaces/i-app-request-representation-generic";

export const AppRequest = createParamDecorator(async (operationName: IApiDocOperationKey, ctx: ExecutionContext): Promise<IAppRequestRepresentationGeneric> => {
  const expressRequest = ctx.switchToHttp().getRequest() as ExpressRequest;

  const requestRepresentation: IAppRequestRepresentationGeneric = {
    method: expressRequest.method,
    headers: expressRequest.headers,
    body: expressRequest.body,
    query: expressRequest.query,
    params: expressRequest.params,
    path: expressRequest.path,
  };

  const { parsed } = await requestValidateAndParse(requestRepresentation);

  return parsed;
});
