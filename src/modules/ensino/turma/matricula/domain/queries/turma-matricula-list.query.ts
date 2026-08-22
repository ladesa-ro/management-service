import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const TurmaMatriculaListQueryFields = {
  ...SharedListFields,
  filterTurmaId: createFieldMetadata({
    description: "Filtro por ID da turma — lista os alunos matriculados na turma",
    nullable: true,
  }),
  filterPerfilId: createFieldMetadata({
    description: "Filtro por ID do perfil — lista as turmas em que o perfil esta matriculado",
    nullable: true,
  }),
};

export class TurmaMatriculaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
}
