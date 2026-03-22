import type { ICommandHandler } from "@/domain/abstractions";
import type { CalendarioLetivoFindOneQueryResult } from "../queries";
import type { CalendarioLetivoCreateCommand } from "./calendario-letivo-create.command";

export const ICalendarioLetivoCreateCommandHandler = Symbol(
  "ICalendarioLetivoCreateCommandHandler",
);

export type ICalendarioLetivoCreateCommandHandler = ICommandHandler<
  CalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQueryResult
>;
