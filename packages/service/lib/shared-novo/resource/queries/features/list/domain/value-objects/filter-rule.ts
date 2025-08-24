export enum FilterRuleOperator {
  EQ = "$eq",
  GT = "$gt",
  GTE = "$gte",
  LT = "$lt",
  LTE = "$lte",
  LIKE = "$like",
  IN = "$in",
  BETWEEN = "$between",
}

export type IFilterRuleBase = {
  operator: FilterRuleOperator;
  property: string;
};

export type IFilterRuleCompareSimple = IFilterRuleBase & {
  operator: FilterRuleOperator.EQ | FilterRuleOperator.GT | FilterRuleOperator.GTE | FilterRuleOperator.LT | FilterRuleOperator.LTE | FilterRuleOperator.LIKE;
  value: any;
};

export type IFilterRuleCompareIn = IFilterRuleBase & {
  operator: FilterRuleOperator.IN;
  value: any[];
};

export type IFilterRuleCompareBetween = IFilterRuleBase & {
  operator: FilterRuleOperator.BETWEEN;
  value: [any, any];
};

export type IFilterRuleCompare = IFilterRuleCompareSimple | IFilterRuleCompareIn | IFilterRuleCompareBetween;

export type IFilterRuleGroup = {
  mode: "$and";
  rules: IFilterRuleCompare[];
};
