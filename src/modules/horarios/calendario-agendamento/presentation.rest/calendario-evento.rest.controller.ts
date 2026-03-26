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
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import { CalendarioAgendamento } from "../domain/calendario-agendamento";
import {
  CalendarioAgendamentoCreateCommandMetadata,
  ICalendarioAgendamentoCreateCommandHandler,
} from "../domain/commands/calendario-agendamento-create.command.handler.interface";
import {
  CalendarioAgendamentoDeleteCommandMetadata,
  ICalendarioAgendamentoDeleteCommandHandler,
} from "../domain/commands/calendario-agendamento-delete.command.handler.interface";
import {
  CalendarioAgendamentoUpdateCommandMetadata,
  ICalendarioAgendamentoUpdateCommandHandler,
} from "../domain/commands/calendario-agendamento-update.command.handler.interface";
import {
  CalendarioAgendamentoFindEventosQueryMetadata,
  ICalendarioAgendamentoFindEventosQueryHandler,
} from "../domain/queries/calendario-agendamento-find-eventos.query.handler.interface";
import {
  CalendarioAgendamentoFindOneQueryMetadata,
  ICalendarioAgendamentoFindOneQueryHandler,
} from "../domain/queries/calendario-agendamento-find-one.query.handler.interface";
import {
  CalendarioEventoCreateInputRestDto,
  CalendarioEventoFindOneOutputRestDto,
  CalendarioEventoFindOneParamsRestDto,
  CalendarioEventoListOutputRestDto,
  CalendarioEventoUpdateInputRestDto,
} from "./calendario-evento.rest.dto";
import * as CalendarioEventoRestMapper from "./calendario-evento.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/eventos")
export class CalendarioEventoRestController {
  constructor(
    @DeclareDependency(ICalendarioAgendamentoFindEventosQueryHandler)
    private readonly findEventosHandler: ICalendarioAgendamentoFindEventosQueryHandler,
    @DeclareDependency(ICalendarioAgendamentoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioAgendamentoFindOneQueryHandler,
    @DeclareDependency(ICalendarioAgendamentoCreateCommandHandler)
    private readonly createHandler: ICalendarioAgendamentoCreateCommandHandler,
    @DeclareDependency(ICalendarioAgendamentoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioAgendamentoUpdateCommandHandler,
    @DeclareDependency(ICalendarioAgendamentoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioAgendamentoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioAgendamentoFindEventosQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query("search") search?: string,
    @Query("filter.turma.id") filterTurmaId?: string,
    @Query("filter.ofertaFormacao.id") filterOfertaFormacaoId?: string,
  ): Promise<CalendarioEventoListOutputRestDto> {
    const results = await this.findEventosHandler.execute(accessContext, {
      search,
      filterTurmaId,
      filterOfertaFormacaoId,
    });

    return {
      data: CalendarioEventoRestMapper.findOneQueryResultToOutputDto.mapArray(results),
    };
  }

  @Get("/:id")
  @ApiOperation(CalendarioAgendamentoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id: params.id });
    ensureExists(queryResult, CalendarioAgendamento.entityName, params.id);
    return CalendarioEventoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(CalendarioAgendamentoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioEventoCreateInputRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const command = CalendarioEventoRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioEventoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(CalendarioAgendamentoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
    @Body() dto: CalendarioEventoUpdateInputRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const command = CalendarioEventoRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CalendarioEventoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(CalendarioAgendamentoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id: params.id });
  }
}
