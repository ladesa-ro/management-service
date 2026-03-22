import type { IQueryHandler } from "@/domain/abstractions";
import type { AuthWhoAmIQueryResult } from "./auth-who-am-i.query.result";

export const IAutenticacaoWhoAmIQueryHandler = Symbol("IAutenticacaoWhoAmIQueryHandler");

export type IAutenticacaoWhoAmIQueryHandler = IQueryHandler<void, AuthWhoAmIQueryResult>;
