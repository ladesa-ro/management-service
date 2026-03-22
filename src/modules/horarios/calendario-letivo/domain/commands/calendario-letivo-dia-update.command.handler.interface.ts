import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
} from "../queries";
import type { CalendarioLetivoDiaUpdateCommand } from "./calendario-letivo-dia-update.command";

export const CalendarioLetivoDiaUpdateCommandMetadata = createOperationMetadata({
  operationId: "calendarioLetivoDiaUpdate",
  summary: "Atualiza um dia de calendario",
});

export const ICalendarioLetivoDiaUpdateCommandHandler = Symbol(
  "ICalendarioLetivoDiaUpdateCommandHandler",
);

export type ICalendarioLetivoDiaUpdateCommandHandler = ICommandHandler<
  CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand,
  CalendarioLetivoDiaFindOneQueryResult
>;
