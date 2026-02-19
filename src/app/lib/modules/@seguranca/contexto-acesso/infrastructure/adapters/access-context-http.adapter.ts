import { RequestActorHttp } from "@/modules/@seguranca/ator-requisicao";
import { ResolveAccessContextPipe } from "../pipes/resolve-access-context.pipe";

/**
 * Decorator para injetar AccessContext em controllers HTTP.
 * Uso: @AccessContextHttp() accessContext: AccessContext
 */
export const AccessContextHttp = (options?: any) =>
  RequestActorHttp(options, ResolveAccessContextPipe);
