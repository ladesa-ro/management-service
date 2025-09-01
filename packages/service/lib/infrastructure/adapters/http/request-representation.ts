import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Static, Type } from "@sinclair/typebox";

export type IRequestRepresentation = {
  ip: string;
  ips: string[];

  protocol: string;
  hostname: string;

  method: string;

  path: string;
  params: Record<string, any>;

  headers: Record<string, any>;

  query: Record<string, any>;
  body: Record<string, any>;
};

export const RequestRepresentationSchema = Type.Object({
  ip: Type.String(),
  ips: Type.Array(Type.String()),

  protocol: Type.String(),
  hostname: Type.String(),

  method: Type.String(),
  path: Type.String(),
  headers: Type.Record(Type.String(), Type.Any()),

  // params: Type.Never(),

  // query: Type.Never(),
  // body: Type.Never(),
});

export type RequestRepresentationDto = Static<typeof RequestRepresentationSchema>;

export const RequestRepresentation = createParamDecorator((_, executionContext: ExecutionContext) => {
  const request = executionContext.switchToHttp().getRequest();

  return {
    ip: request.ip,
    ips: request.ips,

    protocol: request.protocol,
    hostname: request.hostname,

    method: request.method,

    path: request.path,
    params: request.params ?? undefined,

    headers: request.headers ?? {},

    query: request.query ?? undefined,
    body: request.body ?? undefined,
  };
});
