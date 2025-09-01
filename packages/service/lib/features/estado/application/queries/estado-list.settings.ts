import { FilterRuleOperator, ListSettings, SortByMode } from "@/shared";

export const EstadoListSettings = {
  resource: {
    labels: {
      singular: "Estado",
      plural: "Estados",
    },
  },
  sortBy: {
    allowedColumns: ["id", "nome"],
    defaultSortBy: [{ property: "nome", order: SortByMode.ASC }],
  },
  filters: {
    allowedFilters: [["nome", [FilterRuleOperator.EQ]]],
  },
  searchableColumns: ["nome"],
} satisfies ListSettings;
