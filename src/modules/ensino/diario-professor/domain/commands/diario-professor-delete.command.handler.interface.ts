import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneInputDto } from "../../application/dtos";

export type IDiarioProfessorDeleteCommand = {
  accessContext: AccessContext;
  dto: DiarioProfessorFindOneInputDto;
};

export type IDiarioProfessorDeleteCommandHandler = ICommandHandler<
  IDiarioProfessorDeleteCommand,
  boolean
>;
export const IDiarioProfessorDeleteCommandHandler = Symbol("IDiarioProfessorDeleteCommandHandler");
