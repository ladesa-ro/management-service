import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioLetivoDiaListQueryFields = {
  ...SharedListFields,
  filterCalendarioNome: createFieldMetadata({
    description: "Filtro por nome do Calendario",
    nullable: true,
  }),
  filterCalendarioAno: createFieldMetadata({
    description: "Filtro por ano do Calendario",
    nullable: true,
  }),
};

export class CalendarioLetivoDiaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}
