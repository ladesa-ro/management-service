import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioIndisponibilidadeProfessorListQueryFields = {
  ...SharedListFields,
  filterPerfilId: createFieldMetadata({
    description: "Filtro por ID do perfil (professor)",
    nullable: true,
  }),
  filterTipo: createFieldMetadata({ description: "Filtro por tipo", nullable: true }),
};

export class CalendarioIndisponibilidadeProfessorListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.tipo"?: IFilterAcceptableValues;
}
