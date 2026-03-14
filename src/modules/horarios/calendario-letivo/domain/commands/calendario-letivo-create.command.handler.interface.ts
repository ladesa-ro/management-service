import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "../../application/dtos";

export type ICalendarioLetivoCreateCommand = {
  accessContext: AccessContext;
  dto: CalendarioLetivoCreateInputDto;
};

export type ICalendarioLetivoCreateCommandHandler = ICommandHandler<
  ICalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneOutputDto
>;
export const ICalendarioLetivoCreateCommandHandler = Symbol(
  "ICalendarioLetivoCreateCommandHandler",
);
