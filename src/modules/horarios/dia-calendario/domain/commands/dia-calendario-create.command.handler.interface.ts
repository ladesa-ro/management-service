import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneOutputDto,
} from "../../application/dtos";

export type IDiaCalendarioCreateCommand = {
  accessContext: AccessContext;
  dto: DiaCalendarioCreateInputDto;
};

export type IDiaCalendarioCreateCommandHandler = ICommandHandler<
  IDiaCalendarioCreateCommand,
  DiaCalendarioFindOneOutputDto
>;
export const IDiaCalendarioCreateCommandHandler = Symbol("IDiaCalendarioCreateCommandHandler");
