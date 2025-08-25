import { Static, Type } from "@sinclair/typebox";

export const SortByRuleSchema = Type.Object(
  {
    property: Type.String(),
    order: Type.Union([Type.Literal("ASC"), Type.Literal("DESC")]),
  },
  {
    description: "Critério de Ordenação.",
  },
);
export type SortByRuleDto = Static<typeof SortByRuleSchema>;

export const SortByRuleSchemaCustom = (allowedColumns: string[]) => {
  return Type.Composite([
    SortByRuleSchema,
    Type.Object({
      property: Type.Union(allowedColumns.map((column) => Type.Literal(column))),
    }),
  ]);
};

export const SortByRulesSchema = Type.Array(SortByRuleSchema, {
  description: "Critérios de Ordenação.",
});
export type SortByRulesDto = Static<typeof SortByRulesSchema>;

export const SortByRuleSchemaCustomArray = (allowedColumns: string[]) => {
  return Type.Composite([SortByRulesSchema, Type.Array(SortByRuleSchemaCustom(allowedColumns))]);
};
