import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQueryResult } from "../queries";
import type { CalendarioLetivoCreateCommand } from "./calendario-letivo-create.command";

export type ICalendarioLetivoCreateCommandHandler = ICommandHandler<
  CalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQueryResult
>;
export const ICalendarioLetivoCreateCommandHandler = Symbol(
  "ICalendarioLetivoCreateCommandHandler",
);
