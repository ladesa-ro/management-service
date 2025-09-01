import { Static, Type } from "@sinclair/typebox";
import { ListSettings } from "@/shared/base-entity/domain/value-objects/list/list-settings.entity";
import { FilterRuleSchema, SortByRulesCustom, SortByRulesSchema } from "./value-objects/list";

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
      minLength: 0,
    }),

    sortBy: Type.Optional(SortByRulesSchema),
    filters: Type.Optional(FilterRuleSchema),

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
        sortBy: Type.Optional(SortByRulesCustom(settings.sortBy.allowedColumns)),
      }),
    ],
    {
      description: `DTO de entrada para a listagem de ${settings.resource.labels.plural}.`,
    },
  );
};

export type ListInputDtoCustom = ListInputDto;
