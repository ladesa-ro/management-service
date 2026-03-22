import {
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const EstadoListQueryFields = {
  ...SharedListFields,
};

export class EstadoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
