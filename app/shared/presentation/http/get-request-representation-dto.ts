import type { Request } from "express";
import type { RequestRepresentationDto } from "@/shared";

export const getRequestRepresentationDto = (request: Request): RequestRepresentationDto => {
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
};
