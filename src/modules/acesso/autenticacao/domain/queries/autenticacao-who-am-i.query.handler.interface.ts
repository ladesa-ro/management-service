import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthWhoAmIQueryResult } from "./auth-who-am-i.query.result";

export type IAutenticacaoWhoAmIQueryHandler = IQueryHandler<void, AuthWhoAmIQueryResult>;
export const IAutenticacaoWhoAmIQueryHandler = Symbol("IAutenticacaoWhoAmIQueryHandler");
