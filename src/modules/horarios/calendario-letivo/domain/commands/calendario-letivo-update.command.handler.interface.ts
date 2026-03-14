import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "../../application/dtos";

export type ICalendarioLetivoUpdateCommand = {
  accessContext: AccessContext;
  dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto;
};

export type ICalendarioLetivoUpdateCommandHandler = ICommandHandler<
  ICalendarioLetivoUpdateCommand,
  CalendarioLetivoFindOneOutputDto
>;
export const ICalendarioLetivoUpdateCommandHandler = Symbol(
  "ICalendarioLetivoUpdateCommandHandler",
);
