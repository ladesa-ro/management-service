import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const EnderecoListQueryFields = {
  ...SharedListFields,
  filterCidadeId: createFieldMetadata({ description: "Filtro por ID da Cidade", nullable: true }),
};

export class EnderecoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cidade.id"?: IFilterAcceptableValues;
}
