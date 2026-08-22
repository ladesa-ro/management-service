import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioIndisponibilidadeAmbienteListQueryFields = {
  ...SharedListFields,
  filterAmbienteId: createFieldMetadata({
    description: "Filtro por ID do ambiente",
    nullable: true,
  }),
  filterTipo: createFieldMetadata({ description: "Filtro por tipo", nullable: true }),
};

export class CalendarioIndisponibilidadeAmbienteListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ambiente.id"?: IFilterAcceptableValues;
  "filter.tipo"?: IFilterAcceptableValues;
}
