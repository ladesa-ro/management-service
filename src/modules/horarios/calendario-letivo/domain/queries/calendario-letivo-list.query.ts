import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioLetivoListQueryFields = {
  ...SharedListFields,
  filterAno: createFieldMetadata({ description: "Filtro por ano letivo", nullable: true }),
  filterCampusId: createFieldMetadata({ description: "Filtro por ID do Campus", nullable: true }),
  filterOfertaFormacaoId: createFieldMetadata({
    description: "Filtro por ID da Oferta de Formacao",
    nullable: true,
  }),
};

export class CalendarioLetivoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ano"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}
