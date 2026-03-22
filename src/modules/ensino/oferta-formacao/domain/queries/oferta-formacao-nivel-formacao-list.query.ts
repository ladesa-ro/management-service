import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const OfertaFormacaoNivelFormacaoListQueryFields = {
  ...SharedListFields,
  filterNivelFormacaoId: createFieldMetadata({
    description: "Filtro por ID do Nivel de Formacao",
    nullable: true,
  }),
  filterOfertaFormacaoId: createFieldMetadata({
    description: "Filtro por ID da Oferta de Formacao",
    nullable: true,
  }),
};

export class OfertaFormacaoNivelFormacaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.nivelFormacao.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}
