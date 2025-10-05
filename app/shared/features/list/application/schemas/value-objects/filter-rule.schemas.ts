import { Type } from "typebox";
import { FilterRuleOperator } from "@/shared/features/list/domain/value-objects";

export const FilterRuleOperatorDtoSchema = Type.Union([
  Type.Literal(FilterRuleOperator.EQ),
  Type.Literal(FilterRuleOperator.GT),
  Type.Literal(FilterRuleOperator.GTE),
  Type.Literal(FilterRuleOperator.LT),
  Type.Literal(FilterRuleOperator.LTE),
  Type.Literal(FilterRuleOperator.LIKE),
  Type.Literal(FilterRuleOperator.IN),
  Type.Literal(FilterRuleOperator.BETWEEN),
]);

export const FilterRuleBaseDtoSchema = Type.Object(
  {
    operator: FilterRuleOperatorDtoSchema,
    property: Type.String(),
  },
  {
    description: "Regra de Filtro.",
  },
);

export const FilterRuleCompareSimpleDtoSchema = Type.Interface([FilterRuleBaseDtoSchema], {
  operator: Type.Union([Type.Literal(FilterRuleOperator.EQ), Type.Literal(FilterRuleOperator.GT), Type.Literal(FilterRuleOperator.GTE), Type.Literal(FilterRuleOperator.LT), Type.Literal(FilterRuleOperator.LTE)]),
  value: Type.Any(),
});

export const FilterRuleCompareInDtoSchema = Type.Interface([FilterRuleBaseDtoSchema], {
  operator: Type.Literal(FilterRuleOperator.IN),
  value: Type.Array(Type.Any()),
});

export const FilterRuleCompareBetweenDtoSchema = Type.Interface([FilterRuleBaseDtoSchema], {
  operator: Type.Literal(FilterRuleOperator.BETWEEN),
  value: Type.Tuple([Type.Any(), Type.Any()]),
});

export const FilterRuleCompareDtoSchema = Type.Union([FilterRuleCompareSimpleDtoSchema, FilterRuleCompareInDtoSchema, FilterRuleCompareBetweenDtoSchema]);

export const FilterRuleGroupDtoSchema = Type.Object({
  mode: Type.Literal("$and"),
  filters: Type.Array(FilterRuleCompareDtoSchema),
});

export const FilterRuleDtoSchema = Type.Union([FilterRuleGroupDtoSchema]);
