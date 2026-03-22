import {
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CampusListQueryFields = {
  ...SharedListFields,
};

export class CampusListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
