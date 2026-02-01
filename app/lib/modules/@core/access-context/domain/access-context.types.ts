import type { SelectQueryBuilder } from "typeorm";
import type { IRequestActor } from "@/modules/@core/request-actor";

/**
 * Interface do AccessContext.
 */
export interface IAccessContext {
  readonly requestActor: IRequestActor | null;

  applyFilter(
    action: string,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload?: any,
  ): Promise<void>;

  verifyPermission(
    action: string,
    payload: any,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<boolean>;

  ensurePermission(
    action: string,
    payload: any,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<void>;
}

/**
 * @deprecated Use IAccessContext
 */
export interface IContextoDeAcesso extends IAccessContext {}
