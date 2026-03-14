import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery, CalendarioLetivoFindOneQueryResult } from "../queries";
import type { CalendarioLetivoUpdateCommand } from "./calendario-letivo-update.command";
export type ICalendarioLetivoUpdateCommand = {
  accessContext: AccessContext;
  dto: CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand;
};

export type ICalendarioLetivoUpdateCommandHandler = ICommandHandler<
  ICalendarioLetivoUpdateCommand,
  CalendarioLetivoFindOneQueryResult
>;
export const ICalendarioLetivoUpdateCommandHandler = Symbol(
  "ICalendarioLetivoUpdateCommandHandler",
);
