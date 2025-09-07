import { FilterRuleOperator, ListSettings, SortByMode } from "@/shared";

export const CidadeListSettings = {
  resource: {
    labels: {
      singular: "Cidade",
      plural: "Cidades",
    },
  },
  sortBy: {
    allowedColumns: ["id", "nome", "estado.id", "estado.nome"],
    defaultSortBy: [{property: "nome", order: SortByMode.ASC}],
  },
  filters: {
    allowedFilters: [
      ["nome", [FilterRuleOperator.EQ]],
      ["estado.id", [FilterRuleOperator.EQ]],
    ],
  },
  searchableColumns: ["nome", "estado.nome"],
} satisfies ListSettings;
