import { createParamDecorator } from "@nestjs/common";
import type { Request } from "express";
import type { IApiDoc } from "./openapi";

type OperationName = keyof IApiDoc.operations;

export const HttpOperation = (operationName: OperationName) => {};

export const HttpOperationInput = createParamDecorator(async (operationName: OperationName, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();

  const operationInput: {
    query?: Record<string, unknown>;
    header?: Record<string, unknown>;
    path?: Record<string, unknown>;
    cookie?: Record<string, unknown>;
  } = {};

  operationInput.header = request.headers;
  operationInput.query = request.query;
  operationInput.params = request.params;
  operationInput.cookies = request.cookies;

  return operationInput;
});
