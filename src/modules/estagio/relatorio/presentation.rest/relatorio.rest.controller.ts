import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import {
  ApiBody,
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
  IRelatorioCreateCommandHandler,
  IRelatorioDeleteCommandHandler,
  IRelatorioUpdateCommandHandler,
  RelatorioCreateCommandMetadata,
  RelatorioDeleteCommandMetadata,
  RelatorioUpdateCommandMetadata,
} from "../domain/commands";
import {
  IRelatorioFindOneQueryHandler,
  IRelatorioListQueryHandler,
  RelatorioFindOneQueryMetadata,
  RelatorioListQueryMetadata,
} from "../domain/queries";
import { Relatorio } from "../domain/relatorio";
import {
  RelatorioCreateInputRestDto,
  RelatorioFindOneOutputRestDto,
  RelatorioFindOneParamsRestDto,
  RelatorioListInputRestDto,
  RelatorioListOutputRestDto,
  RelatorioUpdateInputRestDto,
} from "./relatorio.rest.dto";
import * as RelatorioRestMapper from "./relatorio.rest.mapper";

@ApiTags("relatorios-estagio")
@Controller("/relatorios-estagio")
export class RelatorioRestController {
  constructor(
    @Dep(IRelatorioListQueryHandler)
    private readonly listHandler: IRelatorioListQueryHandler,
    @Dep(IRelatorioFindOneQueryHandler)
    private readonly findOneHandler: IRelatorioFindOneQueryHandler,
    @Dep(IRelatorioCreateCommandHandler)
    private readonly createHandler: IRelatorioCreateCommandHandler,
    @Dep(IRelatorioUpdateCommandHandler)
    private readonly updateHandler: IRelatorioUpdateCommandHandler,
    @Dep(IRelatorioDeleteCommandHandler)
    private readonly deleteHandler: IRelatorioDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(RelatorioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: RelatorioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: RelatorioListInputRestDto,
  ): Promise<RelatorioListOutputRestDto> {
    const query = RelatorioRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return RelatorioRestMapper.listQueryResultToListOutputDto(queryResult as any);
  }

  @Get("/:id")
  @ApiOperation(RelatorioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: RelatorioFindOneParamsRestDto,
  ): Promise<RelatorioFindOneOutputRestDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id: params.id });
    ensureExists(queryResult, Relatorio.entityName, params.id);
    return RelatorioRestMapper.findOneQueryResultToOutputDto.map(queryResult!);
  }

  @Post("/")
  @ApiOperation(RelatorioCreateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: RelatorioCreateInputRestDto })
  @ApiCreatedResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: RelatorioCreateInputRestDto,
  ): Promise<RelatorioFindOneOutputRestDto> {
    const command = RelatorioRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return RelatorioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(RelatorioUpdateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: RelatorioUpdateInputRestDto })
  @ApiOkResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: RelatorioFindOneParamsRestDto,
    @Body() dto: RelatorioUpdateInputRestDto,
  ): Promise<RelatorioFindOneOutputRestDto> {
    const command = RelatorioRestMapper.updateInputDtoToUpdateCommand.map(dto);
    const queryResult = await this.updateHandler.execute(accessContext, {
      id: params.id,
      ...command,
    });
    return RelatorioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Put("/:id")
  @ApiOperation({
    operationId: "relatorioReplace",
    summary: "Substitui o relatório de estágio",
  })
  @ApiBody({ type: RelatorioUpdateInputRestDto })
  @ApiOkResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async replace(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: RelatorioFindOneParamsRestDto,
    @Body() dto: RelatorioUpdateInputRestDto,
  ): Promise<RelatorioFindOneOutputRestDto> {
    const command = RelatorioRestMapper.updateInputDtoToUpdateCommand.map(dto);
    const queryResult = await this.updateHandler.execute(accessContext, {
      id: params.id,
      ...command,
    });
    return RelatorioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(RelatorioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ description: "Relatório de estágio deletado com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: RelatorioFindOneParamsRestDto,
  ): Promise<{ message: string }> {
    await this.deleteHandler.execute(accessContext, { id: params.id });
    return { message: "Relatório de estágio deletado com sucesso" };
  }
}
