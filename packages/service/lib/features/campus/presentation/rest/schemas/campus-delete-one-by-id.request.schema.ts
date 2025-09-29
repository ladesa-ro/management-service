import { Type } from "@sinclair/typebox";
import { CampusDeleteOneByIdInputSchema } from "@/features/campus";
import { RequestRepresentationSchema } from "@/infrastructure";

export const CampusDeleteOneByIdRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    params: Type.Object({
      id: Type.Index(CampusDeleteOneByIdInputSchema, ["id"]),
    }),
  }),
]);
