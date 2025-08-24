import { FilterRuleOperator, SortByMode } from "@/shared-novo";

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
    defaultSortBy: [string, SortByMode][];
  };

  filters: {
    allowedFilters: [string, FilterRuleOperator[]][];
  };
};
