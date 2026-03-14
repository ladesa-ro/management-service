import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "../../application/dtos";

export type IProfessorIndisponibilidadeListQuery = {
  accessContext: AccessContext;
  dto: ProfessorIndisponibilidadeListInputDto | null;
};

export type IProfessorIndisponibilidadeListQueryHandler = IQueryHandler<
  IProfessorIndisponibilidadeListQuery,
  ProfessorIndisponibilidadeListOutputDto
>;
export const IProfessorIndisponibilidadeListQueryHandler = Symbol(
  "IProfessorIndisponibilidadeListQueryHandler",
);
