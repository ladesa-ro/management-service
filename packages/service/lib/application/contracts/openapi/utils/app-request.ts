import { ArgumentMetadata, createParamDecorator, ExecutionContext, Inject, Injectable, PipeTransform } from "@nestjs/common";
import type { Request as ExpressRequest } from "express";
import { IApiDocOperationKey } from "@/application/contracts/openapi/document/app-openapi-typings";
import { requestValidateAndParse } from "@/application/contracts/openapi/utils/request-validate-and-parse";
import { IAppRequestRepresentationGeneric } from "@/application/interfaces/i-app-request-representation-generic";
import { AppConfigService } from "@/infrastructure/config";

const AppRequestBase = createParamDecorator(async (operationName: IApiDocOperationKey, ctx: ExecutionContext) => {
  const expressRequest = ctx.switchToHttp().getRequest() as ExpressRequest;

  return <IAppRequestRepresentationGeneric>{
    method: expressRequest.method,
    headers: expressRequest.headers,
    body: expressRequest.body,
    query: expressRequest.query,
    params: expressRequest.params,
    path: expressRequest.path, // ainda com prefixo
  };
});

@Injectable()
class RemovePrefixFromPathPipe implements PipeTransform {
  constructor(private readonly configService: AppConfigService) {}

  async transform(value: IAppRequestRepresentationGeneric) {
    const prefix = this.configService.getRuntimePrefix();

    const currentPath = value.path;

    return {
      ...value,
      path: currentPath.startsWith(prefix) ? currentPath.slice(prefix.length) || "/" : currentPath,
    };
  }
}

@Injectable()
class AppRequestValidate implements PipeTransform {
  constructor(
    @Inject(AppConfigService)
    readonly configService: AppConfigService,
  ) {}

  async transform(requestRepresentation: IAppRequestRepresentationGeneric, metadata: ArgumentMetadata) {
    const { parsed } = await requestValidateAndParse(requestRepresentation);
    return parsed;
  }
}

export const AppRequest = (operationName: IApiDocOperationKey) => AppRequestBase(operationName, RemovePrefixFromPathPipe, AppRequestValidate);
