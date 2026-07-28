import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  FolhaPontoCancelCommandMetadata,
  FolhaPontoCreateCommandMetadata,
  IFolhaPontoCancelCommandHandler,
  IFolhaPontoCreateCommandHandler,
} from "../domain/commands";
import { FolhaPonto } from "../domain/folha-ponto";
import {
  FolhaPontoFindOneQueryMetadata,
  FolhaPontoListQueryMetadata,
  IFolhaPontoFindOneQueryHandler,
  IFolhaPontoListQueryHandler,
} from "../domain/queries";
import {
  FolhaPontoCreateInputRestDto,
  FolhaPontoFindOneOutputRestDto,
  FolhaPontoFindOneParamsRestDto,
  FolhaPontoListInputRestDto,
  FolhaPontoListOutputRestDto,
} from "./folha-ponto.rest.dto";
import * as FolhaPontoRestMapper from "./folha-ponto.rest.mapper";

@ApiTags("folha-ponto")
@Controller("/folha-ponto")
export class FolhaPontoRestController {
  constructor(
    @Dep(IFolhaPontoListQueryHandler)
    private readonly listHandler: IFolhaPontoListQueryHandler,
    @Dep(IFolhaPontoFindOneQueryHandler)
    private readonly findOneHandler: IFolhaPontoFindOneQueryHandler,
    @Dep(IFolhaPontoCreateCommandHandler)
    private readonly createHandler: IFolhaPontoCreateCommandHandler,
    @Dep(IFolhaPontoCancelCommandHandler)
    private readonly cancelHandler: IFolhaPontoCancelCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(FolhaPontoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: FolhaPontoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: FolhaPontoListInputRestDto,
  ): Promise<FolhaPontoListOutputRestDto> {
    const query = FolhaPontoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return FolhaPontoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(FolhaPontoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: FolhaPontoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: FolhaPontoFindOneParamsRestDto,
  ): Promise<FolhaPontoFindOneOutputRestDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id: params.id });
    ensureExists(queryResult, FolhaPonto.entityName, params.id);
    return FolhaPontoRestMapper.findOneQueryResultToOutputDto.map(queryResult!);
  }

  @Post("/")
  @ApiOperation(FolhaPontoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: FolhaPontoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: FolhaPontoCreateInputRestDto,
  ): Promise<FolhaPontoFindOneOutputRestDto> {
    const command = FolhaPontoRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return FolhaPontoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(FolhaPontoCancelCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async cancel(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: FolhaPontoFindOneParamsRestDto,
  ): Promise<boolean> {
    return this.cancelHandler.execute(accessContext, params.id);
  }
}
