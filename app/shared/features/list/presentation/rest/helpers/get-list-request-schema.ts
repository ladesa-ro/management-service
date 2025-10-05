import { type TObject, Type } from "typebox";
import { type ListSettingsEntity, RequestRepresentationDtoSchema } from "@/shared";
import { getListSortByPattern } from "./get-list-sort-by-pattern";

export const getListRequestSchema = <Schema extends TObject>(listInputSchema: Schema, listSettings: ListSettingsEntity) => {
  return Type.Interface([RequestRepresentationDtoSchema], {
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
  });
};
