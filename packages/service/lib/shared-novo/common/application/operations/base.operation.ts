import { TSchema } from "@sinclair/typebox";

export type IOperationResponseMetadata = {
  description?: string;
  schemaFactory: () => TSchema;
};

export type IBaseOperationMetadata = {
  operationId: string;
  summary: string;
  description: string;
  responseSchemaFactory: () => TSchema;
  responses?: IOperationResponseMetadata[];
  deprecated?: boolean;
};

export class BaseOperation {
  static meta: IBaseOperationMetadata;
}
