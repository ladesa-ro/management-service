import { FilterRuleOperator, ListSettings, SortByMode } from "@/shared";

export const CampusListSettings = {
  resource: {
    labels: {
      singular: "Campus",
      plural: "Campi",
    },
  },
  sortBy: {
    allowedColumns: ["dateCreated"],
    defaultSortBy: [{property: "dateCreated", order: SortByMode.ASC}],
  },
  filters: {
    allowedFilters: [
      ["id", [FilterRuleOperator.EQ]],
      ["endereco.cidade.id", [FilterRuleOperator.EQ]],
      ["endereco.cidade.estado.id", [FilterRuleOperator.EQ]],
    ],
  },
  searchableColumns: ["nomeFantasia", "razaoSocial", "apelido", "cnpj"],
} satisfies ListSettings;
