import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoAcessoFindOneQuery } from "../queries/calendario-colecao-acesso-find-one.query";

export const CalendarioColecaoAcessoRevogarCommandMetadata = createOperationMetadata({
  operationId: "calendarioColecaoAcessoRevogarOneById",
  summary: "Revoga (soft-delete) um acesso (ACL) de uma coleção de calendário",
});

export const ICalendarioColecaoAcessoRevogarCommandHandler = Symbol(
  "ICalendarioColecaoAcessoRevogarCommandHandler",
);

export type ICalendarioColecaoAcessoRevogarCommandHandler = ICommandHandler<
  CalendarioColecaoAcessoFindOneQuery,
  boolean
>;
