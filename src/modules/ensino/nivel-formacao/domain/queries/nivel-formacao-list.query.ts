import {
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const NivelFormacaoListQueryFields = {
  ...SharedListFields,
};

export class NivelFormacaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
