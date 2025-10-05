import { FilterRuleOperator, type ISortByRules } from "@/shared/features/list/domain/value-objects";

export type ListSettingsEntity = {
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
