import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaUpdateInputDto,
} from "../../application/dtos";

export type IDisciplinaUpdateCommand = {
  accessContext: AccessContext;
  dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto;
};

export type IDisciplinaUpdateCommandHandler = ICommandHandler<
  IDisciplinaUpdateCommand,
  DisciplinaFindOneOutputDto
>;
export const IDisciplinaUpdateCommandHandler = Symbol("IDisciplinaUpdateCommandHandler");
