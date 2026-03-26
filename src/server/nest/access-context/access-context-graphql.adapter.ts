import { RequestActorGraphQL } from "@/server/nest/auth";
import { ResolveAccessContextPipe } from "./resolve-access-context.pipe";

/**
 * Decorator para injetar AccessContext em resolvers GraphQL.
 * Uso: @AccessContextGraphQL() accessContext: IAccessContext
 */

export const AccessContextGraphQL = () => RequestActorGraphQL(undefined, ResolveAccessContextPipe);
