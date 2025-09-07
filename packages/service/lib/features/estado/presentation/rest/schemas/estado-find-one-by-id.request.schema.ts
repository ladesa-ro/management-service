import { Type } from "@sinclair/typebox";
import { EstadoFindOneByIdInputSchema } from "@/features/estado";
import { RequestRepresentationSchema } from "@/infrastructure";

export const EstadoFindOneByIdRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    params: Type.Object({
      id: Type.Index(EstadoFindOneByIdInputSchema, ["id"]),
    }),
  }),
]);
