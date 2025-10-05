import type { Static } from "typebox";
import {
  FilterRuleBaseDtoSchema,
  FilterRuleCompareBetweenDtoSchema,
  FilterRuleCompareDtoSchema,
  FilterRuleCompareInDtoSchema,
  FilterRuleCompareSimpleDtoSchema,
  FilterRuleDtoSchema,
  FilterRuleGroupDtoSchema,
  FilterRuleOperatorDtoSchema
} from "@/shared/features/list/schemas/value-objects/filter-rule.schemas";

export type FilterRuleOperatorDto = Static<typeof FilterRuleOperatorDtoSchema>;

export type FilterRuleBaseDto = Static<typeof FilterRuleBaseDtoSchema>;

export type FilterRuleCompareSimpleDto = Static<typeof FilterRuleCompareSimpleDtoSchema>;

export type FilterRuleCompareInDto = Static<typeof FilterRuleCompareInDtoSchema>;

export type FilterRuleCompareBetweenDto = Static<typeof FilterRuleCompareBetweenDtoSchema>;

export type FilterRuleCompareDto = Static<typeof FilterRuleCompareDtoSchema>;

export type FilterRuleGroupDto = Static<typeof FilterRuleGroupDtoSchema>;

export type FilterRuleDto = Static<typeof FilterRuleDtoSchema>;