import { Type } from "@sinclair/typebox";
import { CampusFindOneByIdInputSchema, CampusUpdateOneByIdInputSchema } from "@/features/campus";
import { RequestRepresentationSchema } from "@/infrastructure";

export const CampusUpdateOneByIdRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    params: Type.Object({
      id: Type.Index(CampusFindOneByIdInputSchema, ["id"]),
    }),
    body: Type.Index(CampusUpdateOneByIdInputSchema, ["data"]),
  }),
]);
