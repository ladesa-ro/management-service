import type { IRequestActor } from "@/domain/abstractions/request-actor";

/**
 * Interface do AccessContext.
 */
export interface IAccessContext {
  readonly requestActor: IRequestActor | null;
}
