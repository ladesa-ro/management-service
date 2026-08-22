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
import { CalendarioIndisponibilidadeProfessor } from "../domain/calendario-indisponibilidade-professor";
import {
  CalendarioIndisponibilidadeProfessorCreateCommandMetadata,
  ICalendarioIndisponibilidadeProfessorCreateCommandHandler,
} from "../domain/commands/calendario-indisponibilidade-professor-create.command.handler.interface";
import {
  CalendarioIndisponibilidadeProfessorDeleteCommandMetadata,
  ICalendarioIndisponibilidadeProfessorDeleteCommandHandler,
} from "../domain/commands/calendario-indisponibilidade-professor-delete.command.handler.interface";
import {
  CalendarioIndisponibilidadeProfessorFindOneQueryMetadata,
  ICalendarioIndisponibilidadeProfessorFindOneQueryHandler,
} from "../domain/queries/calendario-indisponibilidade-professor-find-one.query.handler.interface";
import {
  CalendarioIndisponibilidadeProfessorListQueryMetadata,
  ICalendarioIndisponibilidadeProfessorListQueryHandler,
} from "../domain/queries/calendario-indisponibilidade-professor-list.query.handler.interface";
import {
  CalendarioIndisponibilidadeProfessorPorPeriodoQueryMetadata,
  ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler,
} from "../domain/queries/calendario-indisponibilidade-professor-por-periodo.query.handler.interface";
import {
  CalendarioIndisponibilidadeProfessorCreateInputRestDto,
  CalendarioIndisponibilidadeProfessorFindOneInputRestDto,
  CalendarioIndisponibilidadeProfessorFindOneOutputRestDto,
  CalendarioIndisponibilidadeProfessorListInputRestDto,
  CalendarioIndisponibilidadeProfessorListOutputRestDto,
  CalendarioIndisponibilidadeProfessorPorPeriodoOutputRestDto,
  CalendarioIndisponibilidadeProfessorPorPeriodoQueryRestDto,
} from "./calendario-indisponibilidade-professor.rest.dto";
import * as CalendarioIndisponibilidadeProfessorRestMapper from "./calendario-indisponibilidade-professor.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/indisponibilidades-professor")
export class CalendarioIndisponibilidadeProfessorRestController {
  constructor(
    @Dep(ICalendarioIndisponibilidadeProfessorListQueryHandler)
    private readonly listHandler: ICalendarioIndisponibilidadeProfessorListQueryHandler,
    @Dep(ICalendarioIndisponibilidadeProfessorFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioIndisponibilidadeProfessorFindOneQueryHandler,
    @Dep(ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler)
    private readonly porPeriodoHandler: ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler,
    @Dep(ICalendarioIndisponibilidadeProfessorCreateCommandHandler)
    private readonly createHandler: ICalendarioIndisponibilidadeProfessorCreateCommandHandler,
    @Dep(ICalendarioIndisponibilidadeProfessorDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioIndisponibilidadeProfessorDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioIndisponibilidadeProfessorListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioIndisponibilidadeProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioIndisponibilidadeProfessorListInputRestDto,
  ): Promise<CalendarioIndisponibilidadeProfessorListOutputRestDto> {
    const query = CalendarioIndisponibilidadeProfessorRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioIndisponibilidadeProfessorRestMapper.listQueryResultToListOutputDto(
      queryResult,
    );
  }

  @Get("/por-periodo")
  @ApiOperation(CalendarioIndisponibilidadeProfessorPorPeriodoQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioIndisponibilidadeProfessorPorPeriodoOutputRestDto })
  @ApiForbiddenResponse()
  async findByPeriodo(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioIndisponibilidadeProfessorPorPeriodoQueryRestDto,
  ): Promise<CalendarioIndisponibilidadeProfessorPorPeriodoOutputRestDto> {
    const query = CalendarioIndisponibilidadeProfessorRestMapper.porPeriodoInputDtoToQuery.map(dto);
    const results = await this.porPeriodoHandler.execute(accessContext, query);
    return {
      data: CalendarioIndisponibilidadeProfessorRestMapper.findOneQueryResultToOutputDto.mapArray(
        results,
      ),
    };
  }

  @Get("/:id")
  @ApiOperation(CalendarioIndisponibilidadeProfessorFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioIndisponibilidadeProfessorFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioIndisponibilidadeProfessorFindOneInputRestDto,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneOutputRestDto> {
    const query =
      CalendarioIndisponibilidadeProfessorRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, CalendarioIndisponibilidadeProfessor.entityName, query.id);
    return CalendarioIndisponibilidadeProfessorRestMapper.findOneQueryResultToOutputDto.map(
      queryResult,
    );
  }

  @Post("/")
  @ApiOperation(CalendarioIndisponibilidadeProfessorCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioIndisponibilidadeProfessorFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioIndisponibilidadeProfessorCreateInputRestDto,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneOutputRestDto> {
    const command =
      CalendarioIndisponibilidadeProfessorRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioIndisponibilidadeProfessorRestMapper.findOneQueryResultToOutputDto.map(
      queryResult,
    );
  }

  @Delete("/:id")
  @ApiOperation(CalendarioIndisponibilidadeProfessorDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioIndisponibilidadeProfessorFindOneInputRestDto,
  ): Promise<boolean> {
    const query =
      CalendarioIndisponibilidadeProfessorRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
