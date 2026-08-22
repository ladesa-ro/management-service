import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
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
import { CalendarioColecao } from "../domain/calendario-colecao";
import {
  CalendarioColecaoCreateCommandMetadata,
  ICalendarioColecaoCreateCommandHandler,
} from "../domain/commands/calendario-colecao-create.command.handler.interface";
import {
  CalendarioColecaoDeleteCommandMetadata,
  ICalendarioColecaoDeleteCommandHandler,
} from "../domain/commands/calendario-colecao-delete.command.handler.interface";
import {
  CalendarioColecaoTransferirDonoCommandMetadata,
  ICalendarioColecaoTransferirDonoCommandHandler,
} from "../domain/commands/calendario-colecao-transferir-dono.command.handler.interface";
import {
  CalendarioColecaoUpdateCommandMetadata,
  ICalendarioColecaoUpdateCommandHandler,
} from "../domain/commands/calendario-colecao-update.command.handler.interface";
import {
  CalendarioColecaoFindOneQueryMetadata,
  ICalendarioColecaoFindOneQueryHandler,
} from "../domain/queries/calendario-colecao-find-one.query.handler.interface";
import {
  CalendarioColecaoListQueryMetadata,
  ICalendarioColecaoListQueryHandler,
} from "../domain/queries/calendario-colecao-list.query.handler.interface";
import {
  CalendarioColecaoCreateInputRestDto,
  CalendarioColecaoFindOneInputRestDto,
  CalendarioColecaoFindOneOutputRestDto,
  CalendarioColecaoListInputRestDto,
  CalendarioColecaoListOutputRestDto,
  CalendarioColecaoTransferirDonoInputRestDto,
  CalendarioColecaoUpdateInputRestDto,
} from "./calendario-colecao.rest.dto";
import * as CalendarioColecaoRestMapper from "./calendario-colecao.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/colecoes")
export class CalendarioColecaoRestController {
  constructor(
    @Dep(ICalendarioColecaoListQueryHandler)
    private readonly listHandler: ICalendarioColecaoListQueryHandler,
    @Dep(ICalendarioColecaoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioColecaoFindOneQueryHandler,
    @Dep(ICalendarioColecaoCreateCommandHandler)
    private readonly createHandler: ICalendarioColecaoCreateCommandHandler,
    @Dep(ICalendarioColecaoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioColecaoUpdateCommandHandler,
    @Dep(ICalendarioColecaoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioColecaoDeleteCommandHandler,
    @Dep(ICalendarioColecaoTransferirDonoCommandHandler)
    private readonly transferirDonoHandler: ICalendarioColecaoTransferirDonoCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioColecaoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioColecaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioColecaoListInputRestDto,
  ): Promise<CalendarioColecaoListOutputRestDto> {
    const query = CalendarioColecaoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioColecaoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(CalendarioColecaoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioColecaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoFindOneInputRestDto,
  ): Promise<CalendarioColecaoFindOneOutputRestDto> {
    const query = CalendarioColecaoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, CalendarioColecao.entityName, query.id);
    return CalendarioColecaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(CalendarioColecaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioColecaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioColecaoCreateInputRestDto,
  ): Promise<CalendarioColecaoFindOneOutputRestDto> {
    const command = CalendarioColecaoRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioColecaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(CalendarioColecaoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioColecaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoFindOneInputRestDto,
    @Body() dto: CalendarioColecaoUpdateInputRestDto,
  ): Promise<CalendarioColecaoFindOneOutputRestDto> {
    const command = CalendarioColecaoRestMapper.updateInputDtoToUpdateCommand.map({
      params,
      dto,
    });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CalendarioColecaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(CalendarioColecaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoFindOneInputRestDto,
  ): Promise<boolean> {
    const query = CalendarioColecaoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }

  @Post("/:id/transferir-dono")
  @ApiOperation(CalendarioColecaoTransferirDonoCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioColecaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async transferirDono(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoFindOneInputRestDto,
    @Body() dto: CalendarioColecaoTransferirDonoInputRestDto,
  ): Promise<CalendarioColecaoFindOneOutputRestDto> {
    const command = CalendarioColecaoRestMapper.transferirDonoInputDtoToTransferirDonoCommand.map({
      params,
      dto,
    });
    const queryResult = await this.transferirDonoHandler.execute(accessContext, command);
    return CalendarioColecaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
