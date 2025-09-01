export enum SortByMode {
  ASC = "ASC",
  DESC = "DESC",
}

export type ISortByRule = {
  property: string;
  order: SortByMode;
};

export type ISortByRules = ISortByRule[];
