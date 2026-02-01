import type { SelectQueryBuilder } from "typeorm";
import type { IRequestActor } from "@/modules/@core/request-actor";
import type { IAuthzPayload } from "./authz-payload.types";

/**
 * Interface do AccessContext.
 */
export interface IAccessContext {
  readonly requestActor: IRequestActor | null;

  applyFilter(
    action: string,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload?: IAuthzPayload | null,
  ): Promise<void>;

  verifyPermission(
    action: string,
    payload: IAuthzPayload | null,
    id?: string | number | null,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<boolean>;

  ensurePermission(
    action: string,
    payload: IAuthzPayload | null,
    id?: string | number | null,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<void>;
}
