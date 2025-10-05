import { Type } from "typebox";

export const SortByModeDtoSchema = Type.Evaluate(Type.Union([Type.Literal("ASC"), Type.Literal("DESC")]), {
  default: "ASC",
});

export const SortByRuleDtoSchema = Type.Object(
  {
    property: Type.String(),
    order: Type.Union([Type.Literal("ASC"), Type.Literal("DESC")]),
  },
  {
    description: "Critério de Ordenação.",
  },
);

export const SortByRulesDtoSchema = Type.Array(SortByRuleDtoSchema, {
  description: "Critérios de Ordenação.",
});

export const SortByRuleDtoSchemaCustom = (allowedColumns: string[]) => {
  return Type.Evaluate(
    Type.Intersect([
      SortByRuleDtoSchema,
      Type.Object({
        property: Type.Union([...allowedColumns.map((column) => Type.Literal(column))]),
      }),
    ]),
  );
};

export const SortByRulesDtoSchemaCustom = (allowedColumns: string[]) => {
  return Type.Evaluate(Type.Intersect([SortByRulesDtoSchema, Type.Array(SortByRuleDtoSchemaCustom(allowedColumns))]));
};
