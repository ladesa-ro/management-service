import { RequestActorHttp } from "@/server/nest/auth";
import { ResolveAccessContextPipe } from "../pipes/resolve-access-context.pipe";

/**
 * Decorator para injetar AccessContext em controllers HTTP.
 * Uso: @AccessContextHttp() accessContext: AccessContext
 */
export const AccessContextHttp = (options?: any) =>
  RequestActorHttp(options, ResolveAccessContextPipe);
