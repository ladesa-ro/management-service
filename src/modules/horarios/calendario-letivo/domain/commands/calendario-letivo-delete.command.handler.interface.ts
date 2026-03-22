import type { ICommandHandler } from "@/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "../queries";

export const ICalendarioLetivoDeleteCommandHandler = Symbol(
  "ICalendarioLetivoDeleteCommandHandler",
);

export type ICalendarioLetivoDeleteCommandHandler = ICommandHandler<
  CalendarioLetivoFindOneQuery,
  boolean
>;
