import { Static, Type } from "@sinclair/typebox";
import { FilterRuleOperator } from "@/shared-novo/resource/queries/features/list/domain/value-objects/filter-rule";

const FilterRuleOperatorSchema = Type.Union([
  Type.Literal(FilterRuleOperator.EQ),
  Type.Literal(FilterRuleOperator.GT),
  Type.Literal(FilterRuleOperator.GTE),
  Type.Literal(FilterRuleOperator.LT),
  Type.Literal(FilterRuleOperator.LTE),
  Type.Literal(FilterRuleOperator.LIKE),
  Type.Literal(FilterRuleOperator.IN),
  Type.Literal(FilterRuleOperator.BETWEEN),
]);
export type FilterRuleOperatorDto = Static<typeof FilterRuleOperatorSchema>;

const FilterRuleBaseSchema = Type.Object(
  {
    operator: FilterRuleOperatorSchema,
    property: Type.String(),
  },
  {
    description: "Regra de Filtro.",
  },
);
export type FilterRuleBaseDto = Static<typeof FilterRuleBaseSchema>;

const FilterRuleCompareSimple = Type.Composite([
  FilterRuleBaseSchema,
  Type.Object({
    operator: Type.Union([
      Type.Literal(FilterRuleOperator.EQ),
      Type.Literal(FilterRuleOperator.GT),
      Type.Literal(FilterRuleOperator.GTE),
      Type.Literal(FilterRuleOperator.LT),
      Type.Literal(FilterRuleOperator.LTE),
    ]),
    value: Type.Any(),
  }),
]);
export type FilterRuleCompareSimpleDto = Static<typeof FilterRuleCompareSimple>;

const FilterRuleCompareIn = Type.Composite([
  FilterRuleBaseSchema,
  Type.Object({
    operator: Type.Literal(FilterRuleOperator.IN),
    value: Type.Array(Type.Any()),
  }),
]);
export type FilterRuleCompareInDto = Static<typeof FilterRuleCompareIn>;

const FilterRuleCompareBetween = Type.Composite([
  FilterRuleBaseSchema,
  Type.Object({
    operator: Type.Literal(FilterRuleOperator.BETWEEN),
    value: Type.Tuple([Type.Any(), Type.Any()]),
  }),
]);
export type FilterRuleCompareBetweenDto = Static<typeof FilterRuleCompareBetween>;

export const FilterRuleCompareSchema = Type.Union([FilterRuleCompareSimple, FilterRuleCompareIn, FilterRuleCompareBetween]);
export type FilterRuleCompareDto = Static<typeof FilterRuleCompareSchema>;

export const FilterRuleGroup = Type.Object({
  mode: Type.Literal("$and"),
  filters: Type.Array(FilterRuleCompareSchema),
});
export type FilterRuleGroupDto = Static<typeof FilterRuleGroup>;

export const FilterRuleSchema = Type.Union([FilterRuleGroup]);
export type FilterRuleDto = Static<typeof FilterRuleSchema>;
