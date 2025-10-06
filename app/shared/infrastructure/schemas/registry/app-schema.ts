import type { TSchema, Type } from "typebox";

export interface AppSchema {
  id: string | false;

  getSchema(evaluateContext: AppSchemaEvaluateContext): TSchema;
}

export type AppSchemaType<A extends AppSchema> = Type.Static<ReturnType<A["getSchema"]>>;

export type AppSchemaEvaluateContext = {
  makeReference: <A extends AppSchema>(referencedAppSchema: A) => Type.TSchema;
  getSchema: <A extends AppSchema>(appSchema: A) => ReturnType<A["getSchema"]>;
};

export const createAppSchema = <T extends TSchema>(id: string | false, fn: (evaluateContext: AppSchemaEvaluateContext) => T) => {
  return {
    id: id,
    getSchema(evaluateContext: AppSchemaEvaluateContext): T {
      return fn(evaluateContext);
    },
  } satisfies AppSchema;
};
