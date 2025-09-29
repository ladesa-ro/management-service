import { Type } from "@sinclair/typebox";
import { EnderecoCreateInputSchema } from "@/features/endereco/application/schemas/endereco-create.schema";
import { EnderecoFindOneByIdInputSchema } from "@/features/endereco/application/schemas/endereco-find-one-by-id.schema";
import { makeReference, registerSchema } from "@/shared";

export const EnderecoCreateOrUpdateInputSchema = registerSchema(
  "EnderecoCreateOrUpdateInput",
  Type.Object({
    targetEntity: Type.Union([makeReference(() => EnderecoFindOneByIdInputSchema), Type.Null()]),
    data: makeReference(() => EnderecoCreateInputSchema),
  }),
);
