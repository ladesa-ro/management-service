import { FilterRuleOperator, ISortByRules } from "@/shared";

export type ListSettings = {
  resource: {
    labels: {
      singular: string;
      plural: string;
    };
  };

  searchableColumns: string[];

  sortBy: {
    allowedColumns: string[];
    defaultSortBy: ISortByRules;
  };

  filters: {
    allowedFilters: [string, FilterRuleOperator[]][];
  };
};
