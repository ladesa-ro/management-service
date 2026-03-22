import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CursoListQueryFields = {
  ...SharedListFields,
  filterCampusId: createFieldMetadata({ description: "Filtro por ID do Campus", nullable: true }),
  filterOfertaFormacaoId: createFieldMetadata({
    description: "Filtro por ID da Oferta de Formacao",
    nullable: true,
  }),
};

export class CursoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}
