import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoFindOneQuery } from "../queries/calendario-colecao-find-one.query";

export const CalendarioColecaoDeleteCommandMetadata = createOperationMetadata({
  operationId: "calendarioColecaoDeleteOneById",
  summary: "Remove uma coleção de calendário",
});

export const ICalendarioColecaoDeleteCommandHandler = Symbol(
  "ICalendarioColecaoDeleteCommandHandler",
);

export type ICalendarioColecaoDeleteCommandHandler = ICommandHandler<
  CalendarioColecaoFindOneQuery,
  boolean
>;
