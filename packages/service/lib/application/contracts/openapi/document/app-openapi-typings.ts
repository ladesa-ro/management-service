import type * as IAppApiDoc from "@/application/#/openapi.v3";
import { IAppRequestRepresentationGeneric } from "@/application/interfaces/i-app-request-representation-generic";

export type { IAppApiDoc };

export type IApiDocOperationKey = keyof IAppApiDoc.operations;
export type IApiDocOperationByKey<OperationName extends IApiDocOperationKey> = IAppApiDoc.operations[OperationName];

export type IApiDocOperation = IAppApiDoc.operations[keyof IAppApiDoc.operations];

export type IAppRequest<OperationKey extends IApiDocOperationKey> = IAppRequestRepresentationGeneric & {
  method: IApiDocOperationByKey<OperationKey>["method"];
  path: IApiDocOperationByKey<OperationKey>["path"];

  headers: IApiDocOperationByKey<OperationKey>["parameters"]["header"];
  query: IApiDocOperationByKey<OperationKey>["parameters"]["query"];
  params: IApiDocOperationByKey<OperationKey>["parameters"]["path"];

  body: IApiDocOperationByKey<OperationKey>["requestBody"]["content"]["application/json"];
};
