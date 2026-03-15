import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "../queries";

export type ICalendarioLetivoDeleteCommandHandler = ICommandHandler<
  CalendarioLetivoFindOneQuery,
  boolean
>;
export const ICalendarioLetivoDeleteCommandHandler = Symbol(
  "ICalendarioLetivoDeleteCommandHandler",
);
