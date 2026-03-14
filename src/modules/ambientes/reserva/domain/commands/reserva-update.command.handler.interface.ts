import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaUpdateInputDto,
} from "../../application/dtos";

export type IReservaUpdateCommand = {
  accessContext: AccessContext;
  dto: ReservaFindOneInputDto & ReservaUpdateInputDto;
};

export type IReservaUpdateCommandHandler = ICommandHandler<
  IReservaUpdateCommand,
  ReservaFindOneOutputDto
>;
export const IReservaUpdateCommandHandler = Symbol("IReservaUpdateCommandHandler");
