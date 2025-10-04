import { Type } from "typebox";
import { EstadoFindOneByIdOutputDtoSchema } from "./estado-find-one-by-id.dto.ts";

export type EstadoListInputDto = Type.Static<typeof EstadoListInputDtoSchema>;
export const EstadoListInputDtoSchema = Type.Object({
  page: Type.Integer({ minimum: 1, default: 1 }),
  limit: Type.Integer({ minimum: 1, maximum: 100, default: 20 }),
  search: Type.Union([Type.String(), Type.Null()]),
});

export type EstadoListOutputDto = Type.Static<typeof EstadoListOutputDtoSchema>;
export const EstadoListOutputDtoSchema = Type.Object({
  data: Type.Array(EstadoFindOneByIdOutputDtoSchema),
  meta: Type.Object({
    totalPages: Type.Integer(),
    totalItems: Type.Integer(),
    currentPage: Type.Integer(),
    limit: Type.Integer(),
    search: Type.Union([Type.String(), Type.Null()]),
  }),
});
