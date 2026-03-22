import {
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const ImagemListQueryFields = {
  ...SharedListFields,
};

export class ImagemListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
