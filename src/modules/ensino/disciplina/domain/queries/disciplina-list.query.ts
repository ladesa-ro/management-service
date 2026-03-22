import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const DisciplinaListQueryFields = {
  ...SharedListFields,
  filterDiariosId: createFieldMetadata({
    description: "Filtro por ID dos Diarios",
    nullable: true,
  }),
};

export class DisciplinaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
