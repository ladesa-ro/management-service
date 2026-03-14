import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQueryResult } from "../queries";
import type { CalendarioLetivoCreateCommand } from "./calendario-letivo-create.command";
export type ICalendarioLetivoCreateCommand = {
  accessContext: AccessContext;
  dto: CalendarioLetivoCreateCommand;
};

export type ICalendarioLetivoCreateCommandHandler = ICommandHandler<
  ICalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQueryResult
>;
export const ICalendarioLetivoCreateCommandHandler = Symbol(
  "ICalendarioLetivoCreateCommandHandler",
);
