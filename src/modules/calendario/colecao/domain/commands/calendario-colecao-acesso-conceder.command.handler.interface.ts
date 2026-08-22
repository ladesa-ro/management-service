import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoAcessoFindOneQueryResult } from "../queries/calendario-colecao-acesso-find-one.query.result";
import type { CalendarioColecaoAcessoConcederCommand } from "./calendario-colecao-acesso-conceder.command";

export const CalendarioColecaoAcessoConcederCommandMetadata = createOperationMetadata({
  operationId: "calendarioColecaoAcessoConceder",
  summary: "Concede um acesso (ACL) a uma coleção de calendário",
});

export const ICalendarioColecaoAcessoConcederCommandHandler = Symbol(
  "ICalendarioColecaoAcessoConcederCommandHandler",
);

export type ICalendarioColecaoAcessoConcederCommandHandler = ICommandHandler<
  CalendarioColecaoAcessoConcederCommand,
  CalendarioColecaoAcessoFindOneQueryResult
>;
