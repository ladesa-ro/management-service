import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { HorarioGeradoAulaFindOneInputDto } from "../../application/dtos";

export type IHorarioGeradoAulaDeleteCommand = {
  accessContext: AccessContext;
  dto: HorarioGeradoAulaFindOneInputDto;
};

export type IHorarioGeradoAulaDeleteCommandHandler = ICommandHandler<
  IHorarioGeradoAulaDeleteCommand,
  boolean
>;
export const IHorarioGeradoAulaDeleteCommandHandler = Symbol(
  "IHorarioGeradoAulaDeleteCommandHandler",
);
