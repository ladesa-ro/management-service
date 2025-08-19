import type { SelectQueryBuilder } from "typeorm";
import type { IAuthzStatement, IAuthzStatementFilter } from "@/legacy/application/authorization/rules";
import type { IRequestActor } from "@/shared/infrastructure/authentication";

export interface IAccessContext {
  readonly requestActor: IRequestActor | null;

  applyFilter: <Statement extends IAuthzStatementFilter, Action extends Statement["action"], Payload extends Statement["payload"]>(
    action: Action,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload?: Payload | null,
  ) => Promise<void>;

  ensurePermission: <Statement extends IAuthzStatement, Action extends Statement["action"], Payload extends Statement["payload"]>(
    action: Action,
    payload: Payload,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ) => Promise<void>;

  verifyPermission<Statement extends IAuthzStatement, Action extends Statement["action"], Payload extends Statement["payload"]>(
    action: Action,
    payload: Payload,
    id?: any,
    qb?: SelectQueryBuilder<any> | null,
  ): Promise<boolean>;
}

/**
 * @deprecated use IAccessContext
 */
export interface IContextoDeAcesso extends IAccessContext {}
