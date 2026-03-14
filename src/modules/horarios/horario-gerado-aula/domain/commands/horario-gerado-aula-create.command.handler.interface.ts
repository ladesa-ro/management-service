import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneOutputDto,
} from "../../application/dtos";

export type IHorarioGeradoAulaCreateCommand = {
  accessContext: AccessContext;
  dto: HorarioGeradoAulaCreateInputDto;
};

export type IHorarioGeradoAulaCreateCommandHandler = ICommandHandler<
  IHorarioGeradoAulaCreateCommand,
  HorarioGeradoAulaFindOneOutputDto
>;
export const IHorarioGeradoAulaCreateCommandHandler = Symbol(
  "IHorarioGeradoAulaCreateCommandHandler",
);
