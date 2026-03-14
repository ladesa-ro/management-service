import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { HorarioGeradoFindOneInputDto } from "../../application/dtos";

export type IHorarioGeradoDeleteCommand = {
  accessContext: AccessContext;
  dto: HorarioGeradoFindOneInputDto;
};

export type IHorarioGeradoDeleteCommandHandler = ICommandHandler<
  IHorarioGeradoDeleteCommand,
  boolean
>;
export const IHorarioGeradoDeleteCommandHandler = Symbol("IHorarioGeradoDeleteCommandHandler");
