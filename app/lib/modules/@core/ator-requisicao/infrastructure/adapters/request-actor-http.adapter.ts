import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

/**
 * Decorator para extrair o Request Actor de requisições HTTP.
 * Uso: @RequestActorHttp() actor: IRequestActor
 */
export const RequestActorHttp = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return (request as any).user ?? null;
  },
);
