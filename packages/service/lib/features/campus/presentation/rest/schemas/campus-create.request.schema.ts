import { Type } from "@sinclair/typebox";
import { CampusCreateInputSchema } from "@/features/campus";
import { RequestRepresentationSchema } from "@/infrastructure";

export const CampusCreateRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    body: Type.Composite([CampusCreateInputSchema]),
  }),
]);
