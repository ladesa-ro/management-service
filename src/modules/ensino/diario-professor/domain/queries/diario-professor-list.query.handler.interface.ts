import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
} from "../../application/dtos";

export type IDiarioProfessorListQuery = {
  accessContext: AccessContext;
  dto: DiarioProfessorListInputDto | null;
  selection?: string[] | boolean;
};

export type IDiarioProfessorListQueryHandler = IQueryHandler<
  IDiarioProfessorListQuery,
  DiarioProfessorListOutputDto
>;
export const IDiarioProfessorListQueryHandler = Symbol("IDiarioProfessorListQueryHandler");
