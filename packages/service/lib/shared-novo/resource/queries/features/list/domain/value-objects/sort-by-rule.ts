export enum SortByMode {
  ASC = "ASC",
  DESC = "DESC",
}

export type ISortByRule = {
  property: string;
  mode: SortByMode;
};

export type ISortByRules = ISortByRule[];
