import type { Type } from "typebox";
import {
  type SortByModeDtoSchema,
  type SortByRuleDtoSchema,
  type SortByRulesDtoSchema
} from "@/shared/features/list/schemas/value-objects/sort-by-rule.schemas.ts";

export type SortByModeDto = Type.Static<typeof SortByModeDtoSchema>;

export type SortByRuleDto = Type.Static<typeof SortByRuleDtoSchema>;

export type SortByRulesDto = Type.Static<typeof SortByRulesDtoSchema>;
