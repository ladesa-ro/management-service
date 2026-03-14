import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ReservaFindOneInputDto } from "../../application/dtos";

export type IReservaDeleteCommand = {
  accessContext: AccessContext;
  dto: ReservaFindOneInputDto;
};

export type IReservaDeleteCommandHandler = ICommandHandler<IReservaDeleteCommand, boolean>;
export const IReservaDeleteCommandHandler = Symbol("IReservaDeleteCommandHandler");
