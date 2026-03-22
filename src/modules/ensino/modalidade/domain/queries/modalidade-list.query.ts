import {
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const ModalidadeListQueryFields = {
  ...SharedListFields,
};

export class ModalidadeListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
