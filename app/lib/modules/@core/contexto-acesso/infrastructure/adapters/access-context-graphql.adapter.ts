import { RequestActorGraphQL } from "@/modules/@core/ator-requisicao";
import { ResolveAccessContextPipe } from "../pipes/resolve-access-context.pipe";

/**
 * Decorator para injetar AccessContext em resolvers GraphQL.
 * Uso: @AccessContextGraphQL() accessContext: AccessContext
 */
export const AccessContextGraphQL = (options?: any) =>
  RequestActorGraphQL(options, ResolveAccessContextPipe);
