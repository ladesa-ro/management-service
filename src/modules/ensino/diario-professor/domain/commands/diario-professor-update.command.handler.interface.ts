import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorUpdateInputDto,
} from "../../application/dtos";

export type IDiarioProfessorUpdateCommand = {
  accessContext: AccessContext;
  dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto;
};

export type IDiarioProfessorUpdateCommandHandler = ICommandHandler<
  IDiarioProfessorUpdateCommand,
  DiarioProfessorFindOneOutputDto
>;
export const IDiarioProfessorUpdateCommandHandler = Symbol("IDiarioProfessorUpdateCommandHandler");
