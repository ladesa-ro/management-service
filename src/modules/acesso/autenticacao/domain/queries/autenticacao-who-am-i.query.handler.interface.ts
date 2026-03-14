import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthWhoAmIQueryResult } from "./auth-who-am-i.query.result";
export type IAutenticacaoWhoAmIQuery = {
  accessContext: AccessContext;
};

export type IAutenticacaoWhoAmIQueryHandler = IQueryHandler<
  IAutenticacaoWhoAmIQuery,
  AuthWhoAmIQueryResult
>;
export const IAutenticacaoWhoAmIQueryHandler = Symbol("IAutenticacaoWhoAmIQueryHandler");
