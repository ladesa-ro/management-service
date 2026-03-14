import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaCreateInputDto, DisciplinaFindOneOutputDto } from "../../application/dtos";

export type IDisciplinaCreateCommand = {
  accessContext: AccessContext;
  dto: DisciplinaCreateInputDto;
};

export type IDisciplinaCreateCommandHandler = ICommandHandler<
  IDisciplinaCreateCommand,
  DisciplinaFindOneOutputDto
>;
export const IDisciplinaCreateCommandHandler = Symbol("IDisciplinaCreateCommandHandler");
