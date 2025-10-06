import { Type } from "typebox";
import { createRequestSchema, type ListSettingsEntity } from "@/shared";
import type { AppSchema } from "@/shared/infrastructure/schemas/registry/app-schema.ts";
import { getListSortByPattern } from "./get-list-sort-by-pattern";

export const getListRequestSchema = <A extends AppSchema>(listInputSchema: A, listSettings: ListSettingsEntity) => {
  return createRequestSchema(() => {
    return {
      query: Type.Object({
        page: Type.Optional(Type.Index(listInputSchema, ["page"])),
        limit: Type.Optional(Type.Index(listInputSchema, ["limit"])),
        search: Type.Optional(Type.Index(listInputSchema, ["search"])),

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
    };
  });
};
