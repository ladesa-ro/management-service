import { TObject, Type } from "@sinclair/typebox";
import { RequestRepresentationSchema } from "@/infrastructure";
import { getListSortByPattern, ListSettings } from "@/shared";

export const getListRequestSchema = <Schema extends TObject>(listInputSchema: Schema, listSettings: ListSettings) => {
  return Type.Composite([
    RequestRepresentationSchema,
    Type.Object({
      query: Type.Object({
        page: Type.Index(listInputSchema, ["page"]),
        limit: Type.Index(listInputSchema, ["limit"]),
        search: Type.Index(listInputSchema, ["search"]),

        sortBy: Type.Optional(
          Type.Array(
            Type.String({
              pattern: getListSortByPattern(listSettings.sortBy.allowedColumns),
            }),
          ),
        ),

        // filters: Type.Index(EstadoListInputSchema, ["filters"]),
        // selection: Type.Index(EstadoListInputSchema, ["selection"]),
      }),
    }),
  ]);
};
