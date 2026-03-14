import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "../queries";
export type ICalendarioLetivoDeleteCommand = {
  accessContext: AccessContext;
  dto: CalendarioLetivoFindOneQuery;
};

export type ICalendarioLetivoDeleteCommandHandler = ICommandHandler<
  ICalendarioLetivoDeleteCommand,
  boolean
>;
export const ICalendarioLetivoDeleteCommandHandler = Symbol(
  "ICalendarioLetivoDeleteCommandHandler",
);
