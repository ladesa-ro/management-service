import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioColecaoAcessoListQueryFields = {
  ...SharedListFields,
  filterColecaoId: createFieldMetadata({ description: "Filtro por ID da coleção", nullable: true }),
  filterEscopo: createFieldMetadata({ description: "Filtro por escopo do acesso", nullable: true }),
};

export class CalendarioColecaoAcessoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.colecao.id"?: IFilterAcceptableValues;
  "filter.escopo"?: IFilterAcceptableValues;
}
