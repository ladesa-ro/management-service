import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneOutputDto,
} from "../../application/dtos";

export type IHorarioGeradoCreateCommand = {
  accessContext: AccessContext;
  dto: HorarioGeradoCreateInputDto;
};

export type IHorarioGeradoCreateCommandHandler = ICommandHandler<
  IHorarioGeradoCreateCommand,
  HorarioGeradoFindOneOutputDto
>;
export const IHorarioGeradoCreateCommandHandler = Symbol("IHorarioGeradoCreateCommandHandler");
