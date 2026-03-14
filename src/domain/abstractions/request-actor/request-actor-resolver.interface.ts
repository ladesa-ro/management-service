import type { IRequestActor } from "./request-actor.types";

export interface IRequestActorResolver {
  resolveFromAccessToken(accessToken?: string): Promise<IRequestActor>;
}

export const IRequestActorResolver = Symbol("IRequestActorResolver");
