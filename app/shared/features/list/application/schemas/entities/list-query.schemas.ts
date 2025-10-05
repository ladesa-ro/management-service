import { Type } from "typebox";
import { FilterRuleDtoSchema, SortByRulesDtoSchema } from "@/shared/features/list/application/schemas/value-objects";

export const ListQueryInputDtoSchema = Type.Object({
  page: Type.Integer({
    minimum: 1,
    default: 1,
  }),
  limit: Type.Integer({
    minimum: 1,
    maximum: 100,
    default: 20,
  }),
  search: Type.Union([Type.String(), Type.Null()]),
  filters: Type.Optional(FilterRuleDtoSchema),
  sortBy: Type.Optional(SortByRulesDtoSchema),
  selection: Type.Optional(Type.Array(Type.String())),
});

export const ListQueryOutputDtoSchema = Type.Object({
  data: Type.Array(Type.Unknown()),
  meta: Type.Object({
    totalPages: Type.Integer(),
    totalItems: Type.Integer(),
    currentPage: Type.Integer(),
    itemsPerPage: Type.Integer(),
    search: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  }),
});
