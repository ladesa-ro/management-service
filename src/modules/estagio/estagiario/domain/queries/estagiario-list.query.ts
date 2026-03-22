import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const EstagiarioListQueryFields = {
  ...SharedListFields,
  filterPerfilId: createFieldMetadata({ description: "Filtro por ID de perfil", nullable: true }),
  filterCursoId: createFieldMetadata({ description: "Filtro por ID de curso", nullable: true }),
  filterTurmaId: createFieldMetadata({ description: "Filtro por ID de turma", nullable: true }),
};

export class EstagiarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.curso.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
}
