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
  filterPeriodo: createFieldMetadata({ description: "Filtro por período", nullable: true }),
};

export class EstagiarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.curso.id"?: IFilterAcceptableValues;
  "filter.periodo"?: IFilterAcceptableValues;
}
