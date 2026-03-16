import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoDiaFindOneQuery, CalendarioLetivoDiaFindOneQueryResult } from "../queries";
import type { CalendarioLetivoDiaUpdateCommand } from "./calendario-letivo-dia-update.command";

export type ICalendarioLetivoDiaUpdateCommandHandler = ICommandHandler<
  CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand,
  CalendarioLetivoDiaFindOneQueryResult
>;
export const ICalendarioLetivoDiaUpdateCommandHandler = Symbol("ICalendarioLetivoDiaUpdateCommandHandler");
