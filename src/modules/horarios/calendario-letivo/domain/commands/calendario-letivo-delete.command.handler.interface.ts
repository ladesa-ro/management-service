import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "../queries";

export const CalendarioLetivoDeleteCommandMetadata = createOperationMetadata({
  operationId: "calendarioLetivoDeleteOneById",
  summary: "Remove um calendario letivo",
});

export const ICalendarioLetivoDeleteCommandHandler = Symbol(
  "ICalendarioLetivoDeleteCommandHandler",
);

export type ICalendarioLetivoDeleteCommandHandler = ICommandHandler<
  CalendarioLetivoFindOneQuery,
  boolean
>;
