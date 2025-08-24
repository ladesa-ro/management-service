import { Static, TSchema, Type } from "@sinclair/typebox";
import { ListSettings } from "@/shared-novo";

export const ListOutputSchema = Type.Object({
  data: Type.Array(Type.Any(), {
    description: "Resultados da busca atual.",
  }),
  meta: Type.Object(
    {
      itemsPerPage: Type.Integer({
        description: "Quantidade de itens por página.",
      }),
      totalItems: Type.Integer({
        description: "Total de itens.",
      }),
      currentPage: Type.Integer({
        description: "Página atual.",
      }),
      totalPages: Type.Integer({
        description: "Quantidade total de páginas.",
      }),
      search: Type.String({
        description: "Termo textual da busca.",
      }),
    },
    {
      description: "Metadados dos resultados de busca.",
      additionalProperties: false,
    },
  ),
});

export type ListOutputDto<T = any> = Static<typeof ListOutputSchema> & { data: T[] };

export const ListOutputSchemaCustom = (itemSchema: TSchema, settings: ListSettings) => {
  return Type.Composite(
    [
      ListOutputSchema,
      Type.Object({
        data: Type.Array(itemSchema, {
          description: `Resultados da busca de ${settings.resource.labels.plural}.`,
        }),
      }),
    ],
    {
      description: `DTO de resposta da busca a ${settings.resource.labels.plural}.`,
    },
  );
};
export type ListOutputDtoCustom<T = any> = ListOutputDto<T>;
