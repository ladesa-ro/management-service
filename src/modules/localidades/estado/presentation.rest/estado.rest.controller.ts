import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { Estado } from "@/modules/localidades/estado/domain/estado";
import {
  EstadoFindOneQueryMetadata,
  IEstadoFindOneQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import {
  EstadoListQueryMetadata,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListInputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";
import * as EstadoRestMapper from "./estado.rest.mapper";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoRestController {
  constructor(
    @Dep(IEstadoListQueryHandler)
    private readonly listHandler: IEstadoListQueryHandler,
    @Dep(IEstadoFindOneQueryHandler)
    private readonly findOneHandler: IEstadoFindOneQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation(EstadoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstadoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EstadoListInputRestDto,
  ): Promise<EstadoListOutputRestDto> {
    const query = EstadoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EstadoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(EstadoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstadoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstadoFindOneInputRestDto,
  ): Promise<EstadoFindOneOutputRestDto> {
    const query = EstadoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Estado.entityName, query.id);
    return EstadoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
