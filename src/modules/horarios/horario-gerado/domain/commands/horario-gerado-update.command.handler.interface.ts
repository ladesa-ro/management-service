import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoUpdateInputDto,
} from "../../application/dtos";

export type IHorarioGeradoUpdateCommand = {
  accessContext: AccessContext;
  dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto;
};

export type IHorarioGeradoUpdateCommandHandler = ICommandHandler<
  IHorarioGeradoUpdateCommand,
  HorarioGeradoFindOneOutputDto
>;
export const IHorarioGeradoUpdateCommandHandler = Symbol("IHorarioGeradoUpdateCommandHandler");
