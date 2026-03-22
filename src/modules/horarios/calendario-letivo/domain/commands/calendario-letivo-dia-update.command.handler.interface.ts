import type { ICommandHandler } from "@/domain/abstractions";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
} from "../queries";
import type { CalendarioLetivoDiaUpdateCommand } from "./calendario-letivo-dia-update.command";

export const ICalendarioLetivoDiaUpdateCommandHandler = Symbol(
  "ICalendarioLetivoDiaUpdateCommandHandler",
);

export type ICalendarioLetivoDiaUpdateCommandHandler = ICommandHandler<
  CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand,
  CalendarioLetivoDiaFindOneQueryResult
>;
