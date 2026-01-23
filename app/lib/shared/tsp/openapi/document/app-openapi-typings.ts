import type * as IAppApiDoc from "@@/tsp/openapi.v3";

export type { IAppApiDoc };

export type IApiDocOperationKey = keyof IAppApiDoc.operations;
export type IApiDocOperationByKey<OperationName extends IApiDocOperationKey> = IAppApiDoc.operations[OperationName];

export type IApiDocOperation = IAppApiDoc.operations[keyof IAppApiDoc.operations];

export type IAppRequest<OperationKey extends IApiDocOperationKey> = {
  path: string;
  method: string;

  params: IApiDocOperationByKey<OperationKey>["parameters"]["path"] & {};

  headers: IApiDocOperationByKey<OperationKey>["parameters"]["header"] & {};
  query: IApiDocOperationByKey<OperationKey>["parameters"]["query"] & {};

  body: IApiDocOperationByKey<OperationKey> extends {
    requestBody: { content: { "application/json": infer B } };
  }
    ? B
    : any;
};
