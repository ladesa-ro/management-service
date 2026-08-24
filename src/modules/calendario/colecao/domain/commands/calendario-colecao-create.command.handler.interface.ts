import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoFindOneQueryResult } from "../queries/calendario-colecao-find-one.query.result";
import type { CalendarioColecaoCreateCommand } from "./calendario-colecao-create.command";

export const CalendarioColecaoCreateCommandMetadata = createOperationMetadata({
  operationId: "calendarioColecaoCreate",
  summary: "Cria uma coleção de calendário",
});

export const ICalendarioColecaoCreateCommandHandler = Symbol(
  "ICalendarioColecaoCreateCommandHandler",
);

export type ICalendarioColecaoCreateCommandHandler = ICommandHandler<
  CalendarioColecaoCreateCommand,
  CalendarioColecaoFindOneQueryResult
>;
