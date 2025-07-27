import type * as ILadesaMSOpenApiTypings from "@/application/#/openapi.v3";
import { IAppRequestRepresentationGeneric } from "@/application/interfaces/i-app-request-representation-generic";

export type { ILadesaMSOpenApiTypings };

export type IApiDocOperationKey = keyof ILadesaMSOpenApiTypings.operations;
export type IApiDocOperationByKey<OperationName extends IApiDocOperationKey> = ILadesaMSOpenApiTypings.operations[OperationName];

export type IApiDocOperation = ILadesaMSOpenApiTypings.operations[keyof ILadesaMSOpenApiTypings.operations];

export type IAppRequest<OperationKey extends IApiDocOperationKey> = IAppRequestRepresentationGeneric & {
  method: IApiDocOperationByKey<OperationKey>["method"];
  path: IApiDocOperationByKey<OperationKey>["path"];

  headers: IApiDocOperationByKey<OperationKey>["parameters"]["header"];
  query: IApiDocOperationByKey<OperationKey>["parameters"]["query"];
  params: IApiDocOperationByKey<OperationKey>["parameters"]["path"];

  body: IApiDocOperationByKey<OperationKey>["requestBody"]["content"]["application/json"];
};
