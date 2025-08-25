import { FilterRuleOperator, ListSettings, SortByMode } from "@/shared-novo";

export const EstadoListSettings = {
  resource: {
    labels: {
      singular: "Estado",
      plural: "Estados",
    },
  },
  sortBy: {
    allowedColumns: ["nome", "dateCreated"],
    defaultSortBy: [["dateCreated", SortByMode.DESC]],
  },
  filters: {
    allowedFilters: [
      ["nome", [FilterRuleOperator.EQ]],
      ["dateCreated", [FilterRuleOperator.EQ, FilterRuleOperator.GT, FilterRuleOperator.GTE, FilterRuleOperator.LT, FilterRuleOperator.LTE, FilterRuleOperator.BETWEEN]],
    ],
  },
  searchableColumns: ["nome"],
} satisfies ListSettings;
