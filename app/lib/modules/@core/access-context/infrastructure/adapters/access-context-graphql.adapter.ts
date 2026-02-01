import { RequestActorGql } from "@/modules/@core/request-actor";
import { ResolveAccessContextPipe } from "../pipes/resolve-access-context.pipe";

/**
 * Decorator para injetar AccessContext em resolvers GraphQL.
 * Uso: @AccessContextGraphQl() accessContext: AccessContext
 */
export const AccessContextGraphQl = (options?: any) =>
  RequestActorGql(options, ResolveAccessContextPipe);
