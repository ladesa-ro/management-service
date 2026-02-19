import type { Promisable } from "type-fest";
import type { WhereExpressionBuilder } from "typeorm";
import type { IAccessContext } from "@/modules/@seguranca/contexto-acesso/domain";

/**
 * Tipos de statement de autorização.
 */
export type IBaseAuthzStatementKind = "check" | "filter";

/**
 * Statement base de autorização.
 */
export interface IBaseAuthzStatement<
  Kind extends IBaseAuthzStatementKind,
  Action extends string,
  Payload,
> {
  statementKind: Kind;
  action: Action;
  payload: Payload;
}

/**
 * Contexto passado para funções de autorização.
 */
export type IBaseAuthzStatementContext<Action extends string, Payload = null> = {
  action: Action;
  payload: Payload;
  accessContext: IAccessContext;
};

/**
 * Função de verificação de permissão (para create).
 */
export type IBaseAuthzCheckFn<Action extends string, Payload = null> = (
  context: IBaseAuthzStatementContext<Action, Payload>,
) => Promisable<boolean>;

/**
 * Statement de verificação (para create).
 */
export type IBaseAuthzCheck<Action extends string, Payload = null> = IBaseAuthzStatement<
  "check",
  Action,
  Payload
> & {
  withCheck: boolean | IBaseAuthzCheckFn<Action, Payload>;
};

/**
 * Função de filtro de autorização (para find/update/delete).
 */
export type IBaseAuthzFilterFn<Action extends string, Payload = null> = (
  context: IBaseAuthzStatementContext<Action, Payload>,
  alias?: string,
) => Promisable<(qb: WhereExpressionBuilder) => void>;

/**
 * Statement de filtro (para find/update/delete).
 */
export type IBaseAuthzFilter<Action extends string, Payload = null> = IBaseAuthzStatement<
  "filter",
  Action,
  Payload
> & {
  filter: boolean | IBaseAuthzFilterFn<Action, Payload>;
};

/**
 * Tipo base para statements.
 */
export type IAuthzStatement = IBaseAuthzCheck<string, any> | IBaseAuthzFilter<string, any>;
export type IAuthzStatementCheck = IBaseAuthzCheck<string, any>;
export type IAuthzStatementFilter = IBaseAuthzFilter<string, any>;

/**
 * Helper para criar statements.
 */
export const createStatement = <Statement extends IAuthzStatement>(
  statement: Omit<Statement, "payload">,
) => {
  return { ...statement, payload: null as any } as Statement;
};
