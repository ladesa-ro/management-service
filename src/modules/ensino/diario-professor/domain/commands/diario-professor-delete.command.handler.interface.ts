import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery } from "../queries";
export type IDiarioProfessorDeleteCommand = {
  accessContext: AccessContext;
  dto: DiarioProfessorFindOneQuery;
};

export type IDiarioProfessorDeleteCommandHandler = ICommandHandler<
  IDiarioProfessorDeleteCommand,
  boolean
>;
export const IDiarioProfessorDeleteCommandHandler = Symbol("IDiarioProfessorDeleteCommandHandler");
