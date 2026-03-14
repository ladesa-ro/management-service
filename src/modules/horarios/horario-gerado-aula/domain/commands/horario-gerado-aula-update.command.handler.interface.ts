import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "../../application/dtos";

export type IHorarioGeradoAulaUpdateCommand = {
  accessContext: AccessContext;
  dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto;
};

export type IHorarioGeradoAulaUpdateCommandHandler = ICommandHandler<
  IHorarioGeradoAulaUpdateCommand,
  HorarioGeradoAulaFindOneOutputDto
>;
export const IHorarioGeradoAulaUpdateCommandHandler = Symbol(
  "IHorarioGeradoAulaUpdateCommandHandler",
);
