import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "../queries";

export const ICalendarioLetivoDeleteCommandHandler = Symbol(
  "ICalendarioLetivoDeleteCommandHandler",
);

export type ICalendarioLetivoDeleteCommandHandler = ICommandHandler<
  CalendarioLetivoFindOneQuery,
  boolean
>;
