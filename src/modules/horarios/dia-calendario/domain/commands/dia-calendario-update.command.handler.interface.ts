import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioUpdateInputDto,
} from "../../application/dtos";

export type IDiaCalendarioUpdateCommand = {
  accessContext: AccessContext;
  dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto;
};

export type IDiaCalendarioUpdateCommandHandler = ICommandHandler<
  IDiaCalendarioUpdateCommand,
  DiaCalendarioFindOneOutputDto
>;
export const IDiaCalendarioUpdateCommandHandler = Symbol("IDiaCalendarioUpdateCommandHandler");
