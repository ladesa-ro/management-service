import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery } from "../queries";

export type IDiarioProfessorDeleteCommandHandler = ICommandHandler<
  DiarioProfessorFindOneQuery,
  boolean
>;
export const IDiarioProfessorDeleteCommandHandler = Symbol("IDiarioProfessorDeleteCommandHandler");
