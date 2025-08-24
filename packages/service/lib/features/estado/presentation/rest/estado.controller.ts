import { applyDecorators, Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { EstadoFindOneByIdQuery, EstadoListQuery } from "@/features/estado/application";
import { EstadoApplicationService } from "@/features/estado/application/estado-application-service";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { makeOpenApiReference } from "@/shared-novo";
import { IBaseOperationMetadata } from "@/shared-novo/common/application/operations/base.operation";
import { toEstadoFindOneByIdInputDto, toEstadoListInputDto } from "@/features/estado/infrastructure/adapters";

const RotaDocumentada = (operationMetadata: IBaseOperationMetadata) => {
  const decorators: MethodDecorator[] = [];

  const summary = operationMetadata.summary || operationMetadata.operationId;

  decorators.push(
    ApiOperation({
      summary: summary,
      description: operationMetadata.description || summary,
      operationId: operationMetadata.operationId,
      deprecated: operationMetadata.deprecated,
    }),
  );

  decorators.push(
    ApiOkResponse({
      schema: makeOpenApiReference(() => operationMetadata.responseSchemaFactory()),
    }),
  );

  return applyDecorators(...decorators);
};

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoApplicationService: EstadoApplicationService) {
  }

  @Get("/")
  @RotaDocumentada(EstadoListQuery.meta)
  async estadoList(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EstadoList") dto: IAppRequest<"EstadoList">) {
    const inputDto = toEstadoListInputDto(dto);
    return this.estadoApplicationService.estadoList(accessContext, inputDto);
  }

  @Get("/:id")
  @RotaDocumentada(EstadoFindOneByIdQuery.meta)
  async findById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EstadoFindOneById") dto: IAppRequest<"EstadoFindOneById">) {
    const inputDto = toEstadoFindOneByIdInputDto(dto);
    return this.estadoApplicationService.estadoFindOneById(accessContext, inputDto);
  }
}
