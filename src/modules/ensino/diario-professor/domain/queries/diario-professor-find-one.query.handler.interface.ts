import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
} from "../../application/dtos";

export type IDiarioProfessorFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiarioProfessorFindOneInputDto;
  selection?: string[] | boolean;
};

export type IDiarioProfessorFindOneQueryHandler = IQueryHandler<
  IDiarioProfessorFindOneQuery,
  DiarioProfessorFindOneOutputDto | null
>;
export const IDiarioProfessorFindOneQueryHandler = Symbol("IDiarioProfessorFindOneQueryHandler");
