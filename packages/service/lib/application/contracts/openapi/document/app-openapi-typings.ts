import type * as IAppApiDoc from "@/application/#/openapi.v3";
import { IAppRequestRepresentationGeneric } from "@/application/interfaces/i-app-request-representation-generic";

export type { IAppApiDoc };

export type IApiDocOperationKey = keyof IAppApiDoc.operations;
export type IApiDocOperationByKey<OperationName extends IApiDocOperationKey> = IAppApiDoc.operations[OperationName];

export type IApiDocOperation = IAppApiDoc.operations[keyof IAppApiDoc.operations];

export type IAppRequest<OperationKey extends IApiDocOperationKey> = IAppRequestRepresentationGeneric & {
  method: IApiDocOperationByKey<OperationKey> extends { method: infer M } ? M : never;
  path: IApiDocOperationByKey<OperationKey> extends { path: infer P } ? P : never;

  headers: IApiDocOperationByKey<OperationKey>["parameters"]["header"];
  query: IApiDocOperationByKey<OperationKey>["parameters"]["query"];
  params: IApiDocOperationByKey<OperationKey>["parameters"]["path"];

  body: IApiDocOperationByKey<OperationKey> extends { requestBody: { content: { "application/json": infer B } } }
    ? B
    : never;
};
