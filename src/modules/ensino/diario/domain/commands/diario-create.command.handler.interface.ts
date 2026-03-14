import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioCreateInputDto, DiarioFindOneOutputDto } from "../../application/dtos";

export type IDiarioCreateCommand = {
  accessContext: AccessContext;
  dto: DiarioCreateInputDto;
};

export type IDiarioCreateCommandHandler = ICommandHandler<
  IDiarioCreateCommand,
  DiarioFindOneOutputDto
>;
export const IDiarioCreateCommandHandler = Symbol("IDiarioCreateCommandHandler");
