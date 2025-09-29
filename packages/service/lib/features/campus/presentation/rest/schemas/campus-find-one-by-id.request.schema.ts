import { Type } from "@sinclair/typebox";
import { CampusFindOneByIdInputSchema } from "@/features/campus";
import { RequestRepresentationSchema } from "@/infrastructure";

export const CampusFindOneByIdRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    params: Type.Object({
      id: Type.Index(CampusFindOneByIdInputSchema, ["id"]),
    }),
  }),
]);
