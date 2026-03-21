import type { IRequestActor } from "./request-actor.types";

export const IRequestActorResolver = Symbol("IRequestActorResolver");

export interface IRequestActorResolver {
  resolveFromAccessToken(accessToken?: string): Promise<IRequestActor>;
}
