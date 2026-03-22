import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioLetivoFindOneQueryResult } from "../queries";
import type { CalendarioLetivoCreateCommand } from "./calendario-letivo-create.command";

export const CalendarioLetivoCreateCommandMetadata = createOperationMetadata({
  operationId: "calendarioLetivoCreate",
  summary: "Cria um calendario letivo",
});

export const ICalendarioLetivoCreateCommandHandler = Symbol(
  "ICalendarioLetivoCreateCommandHandler",
);

export type ICalendarioLetivoCreateCommandHandler = ICommandHandler<
  CalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQueryResult
>;
