import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const BlocoListQueryFields = {
  ...SharedListFields,
  filterCampusId: createFieldMetadata({ description: "Filtro por ID de Campus", nullable: true }),
};

export class BlocoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
}
