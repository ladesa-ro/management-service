import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AuthWhoAmIQueryResult } from "./auth-who-am-i.query.result";

export const AutenticacaoWhoAmIQueryMetadata = createOperationMetadata({
  operationId: "autenticacaoWhoAmI",
  summary: "Retorna informacoes do usuario logado",
});

export const IAutenticacaoWhoAmIQueryHandler = Symbol("IAutenticacaoWhoAmIQueryHandler");

export type IAutenticacaoWhoAmIQueryHandler = IQueryHandler<void, AuthWhoAmIQueryResult>;
