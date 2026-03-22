import {
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const ArquivoListQueryFields = {
  ...SharedListFields,
};

export class ArquivoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
