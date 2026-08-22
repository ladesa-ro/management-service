import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoFindOneQuery } from "../queries/calendario-colecao-find-one.query";
import type { CalendarioColecaoFindOneQueryResult } from "../queries/calendario-colecao-find-one.query.result";
import type { CalendarioColecaoTransferirDonoCommand } from "./calendario-colecao-transferir-dono.command";

export const CalendarioColecaoTransferirDonoCommandMetadata = createOperationMetadata({
  operationId: "calendarioColecaoTransferirDono",
  summary: "Transfere a titularidade (dono) de uma coleção de calendário",
});

export const ICalendarioColecaoTransferirDonoCommandHandler = Symbol(
  "ICalendarioColecaoTransferirDonoCommandHandler",
);

export type ICalendarioColecaoTransferirDonoCommandHandler = ICommandHandler<
  CalendarioColecaoFindOneQuery & CalendarioColecaoTransferirDonoCommand,
  CalendarioColecaoFindOneQueryResult
>;
