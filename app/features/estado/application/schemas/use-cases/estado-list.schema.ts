import { Type } from "typebox";
import { EstadoFindOneByIdOutputSchema } from "@/features";
import { ListQueryInputDtoSchema, ListQueryOutputDtoSchema } from "@/shared/features/list";
import { type AppSchemaEvaluateContext, createAppSchema } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export const EstadoListInputDtoSchema = createAppSchema(
  "EstadoListInput",

  () => {
    return Type.Interface([ListQueryInputDtoSchema], {});
  },
);

export const EstadoListOutputItemDtoSchema = createAppSchema(
  "EstadoListOutputItem",

  () => {
    return Type.Interface([EstadoFindOneByIdOutputSchema], {});
  },
);

export const EstadoListOutputDtoSchema = createAppSchema(
  "EstadoListOutput",

  (ctx: AppSchemaEvaluateContext) => {
    return Type.Interface([ListQueryOutputDtoSchema], {
      data: Type.Array(ctx.makeReference(EstadoListOutputItemDtoSchema)),
    });
  },
);
