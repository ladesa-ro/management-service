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
import { CalendarioAgendamento } from "../domain/calendario-agendamento";
import type { CalendarioAgendamentoStatus } from "../domain/calendario-agendamento.types";
import {
  CalendarioAgendamentoCreateCommandMetadata,
  ICalendarioAgendamentoCreateCommandHandler,
} from "../domain/commands/calendario-agendamento-create.command.handler.interface";
import {
  CalendarioAgendamentoDeleteCommandMetadata,
  ICalendarioAgendamentoDeleteCommandHandler,
} from "../domain/commands/calendario-agendamento-delete.command.handler.interface";
import {
  CalendarioAgendamentoDesvincularTurmaCommandMetadata,
  ICalendarioAgendamentoDesvincularTurmaCommandHandler,
} from "../domain/commands/calendario-agendamento-desvincular-turma.command.handler.interface";
import {
  CalendarioAgendamentoUpdateCommandMetadata,
  ICalendarioAgendamentoUpdateCommandHandler,
} from "../domain/commands/calendario-agendamento-update.command.handler.interface";
import {
  CalendarioAgendamentoUpdateStatusCommandMetadata,
  ICalendarioAgendamentoUpdateStatusCommandHandler,
} from "../domain/commands/calendario-agendamento-update-status.command.handler.interface";
import {
  CalendarioAgendamentoFindOneQueryMetadata,
  ICalendarioAgendamentoFindOneQueryHandler,
} from "../domain/queries/calendario-agendamento-find-one.query.handler.interface";
import {
  CalendarioAgendamentoListQueryMetadata,
  ICalendarioAgendamentoListQueryHandler,
} from "../domain/queries/calendario-agendamento-list.query.handler.interface";
import {
  CalendarioAgendamentoCreateInputRestDto,
  CalendarioAgendamentoDesvincularTurmaParamsRestDto,
  CalendarioAgendamentoFindOneOutputRestDto,
  CalendarioAgendamentoFindOneParamsRestDto,
  CalendarioAgendamentoListInputRestDto,
  CalendarioAgendamentoListOutputRestDto,
  CalendarioAgendamentoUpdateInputRestDto,
  CalendarioAgendamentoUpdateStatusInputRestDto,
} from "./calendario-agendamento.rest.dto";
import * as CalendarioAgendamentoRestMapper from "./calendario-agendamento.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/agendamentos")
export class CalendarioAgendamentoRestController {
  constructor(
    @Dep(ICalendarioAgendamentoListQueryHandler)
    private readonly listHandler: ICalendarioAgendamentoListQueryHandler,
    @Dep(ICalendarioAgendamentoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioAgendamentoFindOneQueryHandler,
    @Dep(ICalendarioAgendamentoCreateCommandHandler)
    private readonly createHandler: ICalendarioAgendamentoCreateCommandHandler,
    @Dep(ICalendarioAgendamentoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioAgendamentoUpdateCommandHandler,
    @Dep(ICalendarioAgendamentoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioAgendamentoDeleteCommandHandler,
    @Dep(ICalendarioAgendamentoDesvincularTurmaCommandHandler)
    private readonly desvincularTurmaHandler: ICalendarioAgendamentoDesvincularTurmaCommandHandler,
    @Dep(ICalendarioAgendamentoUpdateStatusCommandHandler)
    private readonly updateStatusHandler: ICalendarioAgendamentoUpdateStatusCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioAgendamentoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioAgendamentoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioAgendamentoListInputRestDto,
  ): Promise<CalendarioAgendamentoListOutputRestDto> {
    const query = CalendarioAgendamentoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioAgendamentoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(CalendarioAgendamentoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioAgendamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioAgendamentoFindOneParamsRestDto,
  ): Promise<CalendarioAgendamentoFindOneOutputRestDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id: params.id });
    ensureExists(queryResult, CalendarioAgendamento.entityName, params.id);
    return CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(CalendarioAgendamentoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioAgendamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioAgendamentoCreateInputRestDto,
  ): Promise<CalendarioAgendamentoFindOneOutputRestDto> {
    const command = CalendarioAgendamentoRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(CalendarioAgendamentoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioAgendamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioAgendamentoFindOneParamsRestDto,
    @Body() dto: CalendarioAgendamentoUpdateInputRestDto,
  ): Promise<CalendarioAgendamentoFindOneOutputRestDto> {
    const command = CalendarioAgendamentoRestMapper.updateInputDtoToUpdateCommand.map({
      params,
      dto,
    });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(CalendarioAgendamentoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioAgendamentoFindOneParamsRestDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id: params.id });
  }

  @Delete("/:id/turmas/:turmaId")
  @ApiOperation(CalendarioAgendamentoDesvincularTurmaCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async desvincularTurma(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioAgendamentoDesvincularTurmaParamsRestDto,
  ): Promise<boolean> {
    return this.desvincularTurmaHandler.execute(accessContext, {
      id: params.id,
      turmaId: params.turmaId,
    });
  }

  @Patch("/:id/status")
  @ApiOperation(CalendarioAgendamentoUpdateStatusCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioAgendamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async updateStatus(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioAgendamentoFindOneParamsRestDto,
    @Body() dto: CalendarioAgendamentoUpdateStatusInputRestDto,
  ): Promise<CalendarioAgendamentoFindOneOutputRestDto> {
    const queryResult = await this.updateStatusHandler.execute(accessContext, {
      id: params.id,
      status: dto.status as CalendarioAgendamentoStatus,
    });
    return CalendarioAgendamentoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
