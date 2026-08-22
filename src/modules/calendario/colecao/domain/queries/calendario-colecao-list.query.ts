import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioColecaoListQueryFields = {
  ...SharedListFields,
  filterCampusId: createFieldMetadata({ description: "Filtro por ID do campus", nullable: true }),
  filterVisibilidade: createFieldMetadata({
    description: "Filtro por visibilidade",
    nullable: true,
  }),
};

export class CalendarioColecaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.visibilidade"?: IFilterAcceptableValues;
}
