import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ReservaCreateInputDto, ReservaFindOneOutputDto } from "../../application/dtos";

export type IReservaCreateCommand = {
  accessContext: AccessContext;
  dto: ReservaCreateInputDto;
};

export type IReservaCreateCommandHandler = ICommandHandler<
  IReservaCreateCommand,
  ReservaFindOneOutputDto
>;
export const IReservaCreateCommandHandler = Symbol("IReservaCreateCommandHandler");
