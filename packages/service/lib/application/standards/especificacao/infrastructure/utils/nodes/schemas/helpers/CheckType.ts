import * as valibot from "valibot";

export const CheckType = <const TSchema extends valibot.BaseSchema<unknown, unknown, valibot.BaseIssue<unknown>>, Out extends valibot.InferOutput<TSchema>>(
  schema: TSchema,
  data: any,
): data is Out => {
  return valibot.is(schema, data);
};

export const BuildCheckType = <const TSchema extends valibot.BaseSchema<unknown, unknown, valibot.BaseIssue<unknown>>, Out extends valibot.InferOutput<TSchema>>(schema: TSchema) => {
  return (node: any): node is Out => {
    return CheckType<TSchema, Out>(schema, node);
  };
};

export const BuildParseType = <const TSchema extends valibot.BaseSchema<unknown, unknown, valibot.BaseIssue<unknown>>, Input extends valibot.InferInput<TSchema>>(schema: TSchema) => {
  return (data: Input): valibot.InferOutput<TSchema> => {
    return valibot.parse<TSchema>(schema, data);
  };
};
