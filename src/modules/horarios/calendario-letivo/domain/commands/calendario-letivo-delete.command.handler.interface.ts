import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneInputDto } from "../../application/dtos";

export type ICalendarioLetivoDeleteCommand = {
  accessContext: AccessContext;
  dto: CalendarioLetivoFindOneInputDto;
};

export type ICalendarioLetivoDeleteCommandHandler = ICommandHandler<
  ICalendarioLetivoDeleteCommand,
  boolean
>;
export const ICalendarioLetivoDeleteCommandHandler = Symbol(
  "ICalendarioLetivoDeleteCommandHandler",
);
