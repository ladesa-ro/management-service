import { type TProperties, Type } from "typebox";
import { RequestRepresentationDtoSchema } from "@/shared";
import { type AppSchemaEvaluateContext, createAppSchema } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export const createRequestSchema = <Properties extends TProperties>(fn: (evaluateContext: AppSchemaEvaluateContext) => Properties) => {
  return createAppSchema(false, (context) => {
    return Type.Interface([RequestRepresentationDtoSchema], {
      ...fn(context),
    });
  });
};
