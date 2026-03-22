import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const OfertaFormacaoListQueryFields = {
  ...SharedListFields,
  filterModalidadeId: createFieldMetadata({
    description: "Filtro por ID da Modalidade",
    nullable: true,
  }),
};

export class OfertaFormacaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.modalidade.id"?: IFilterAcceptableValues;
}
