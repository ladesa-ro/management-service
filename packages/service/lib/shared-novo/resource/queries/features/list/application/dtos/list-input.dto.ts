import { Static, Type } from "@sinclair/typebox";
import { FilterRuleSchema, ListSettings, SortByRuleSchemaCustomArray } from "@/shared-novo";
import { SortByRulesSchema } from "./sort-by-rule.dto";

export const ListInputSchema = Type.Object(
  {
    page: Type.Integer({
      minimum: 1,
      default: 1,
      description: "Página de consulta.",
    }),
    limit: Type.Integer({
      minimum: 1,
      default: 20,
      description: "Limite da quantidade de resultados por página.",
      maximum: 100,
    }),
    search: Type.String({
      description: "Termo textual da busca.",
      default: "",
    }),

    sortBy: SortByRulesSchema,
    filters: FilterRuleSchema,

    selection: Type.Optional(Type.Array(Type.String())),
  },
  {
    description: "DTO de entrada para a listagem deste recurso.",
  },
);

export type ListInputDto = Static<typeof ListInputSchema>;

export const ListInputSchemaCustom = (settings: ListSettings) => {
  return Type.Composite(
    [
      ListInputSchema,
      Type.Object({
        sortBy: SortByRuleSchemaCustomArray(settings.sortBy.allowedColumns),
      }),
    ],
    {
      description: `DTO de entrada para a listagem de ${settings.resource.labels.plural}.`,
    },
  );
};

export type ListInputDtoCustom = ListInputDto;
