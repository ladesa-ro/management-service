import { Type } from "@sinclair/typebox";
import { CampusCreateInputSchema } from "@/features/campus/application/schemas/campus-create-input.schema";
import { CampusFindOneByIdInputSchema } from "@/features/campus/application/schemas/campus-find-one-by-id-input.schema";
import { makeReference, registerSchema } from "@/shared";

export const CampusUpdateOneByIdInputSchema = registerSchema(
  "CidadeUpdateOneByIdInput",
  Type.Object({
    targetEntity: makeReference(() => CampusFindOneByIdInputSchema),
    data: Type.Optional(makeReference(() => CampusCreateInputSchema)),
  }),
);
