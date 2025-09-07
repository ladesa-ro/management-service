import { Type } from "@sinclair/typebox";
import { CidadeFindOneByIdInputSchema } from "@/features/cidade/application/schemas";
import { RequestRepresentationSchema } from "@/infrastructure";

export const CidadeFindOneByIdRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    params: Type.Object({
      id: Type.Index(CidadeFindOneByIdInputSchema, ["id"]),
    }),
  }),
]);
