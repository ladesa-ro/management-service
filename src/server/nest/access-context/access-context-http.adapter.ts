import { RequestActorHttp } from "@/server/nest/auth";
import { ResolveAccessContextPipe } from "./resolve-access-context.pipe";

/**
 * Decorator para injetar AccessContext em controllers HTTP.
 * Uso: @AccessContextHttp() accessContext: IAccessContext
 */
export const AccessContextHttp = () => RequestActorHttp(undefined, ResolveAccessContextPipe);
