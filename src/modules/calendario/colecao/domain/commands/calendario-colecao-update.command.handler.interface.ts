import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoFindOneQuery } from "../queries/calendario-colecao-find-one.query";
import type { CalendarioColecaoFindOneQueryResult } from "../queries/calendario-colecao-find-one.query.result";
import type { CalendarioColecaoUpdateCommand } from "./calendario-colecao-update.command";

export const CalendarioColecaoUpdateCommandMetadata = createOperationMetadata({
  operationId: "calendarioColecaoUpdate",
  summary: "Atualiza uma coleção de calendário",
});

export const ICalendarioColecaoUpdateCommandHandler = Symbol(
  "ICalendarioColecaoUpdateCommandHandler",
);

export type ICalendarioColecaoUpdateCommandHandler = ICommandHandler<
  CalendarioColecaoFindOneQuery & CalendarioColecaoUpdateCommand,
  CalendarioColecaoFindOneQueryResult
>;
