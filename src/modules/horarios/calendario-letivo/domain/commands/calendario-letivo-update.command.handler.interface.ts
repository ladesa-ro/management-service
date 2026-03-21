import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery, CalendarioLetivoFindOneQueryResult } from "../queries";
import type { CalendarioLetivoUpdateCommand } from "./calendario-letivo-update.command";

export const ICalendarioLetivoUpdateCommandHandler = Symbol(
  "ICalendarioLetivoUpdateCommandHandler",
);

export type ICalendarioLetivoUpdateCommandHandler = ICommandHandler<
  CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand,
  CalendarioLetivoFindOneQueryResult
>;
