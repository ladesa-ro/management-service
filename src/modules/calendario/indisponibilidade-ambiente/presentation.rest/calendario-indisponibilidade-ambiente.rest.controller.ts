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
import { CalendarioIndisponibilidadeAmbiente } from "../domain/calendario-indisponibilidade-ambiente";
import {
  CalendarioIndisponibilidadeAmbienteCreateCommandMetadata,
  ICalendarioIndisponibilidadeAmbienteCreateCommandHandler,
} from "../domain/commands/calendario-indisponibilidade-ambiente-create.command.handler.interface";
import {
  CalendarioIndisponibilidadeAmbienteDeleteCommandMetadata,
  ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler,
} from "../domain/commands/calendario-indisponibilidade-ambiente-delete.command.handler.interface";
import {
  CalendarioIndisponibilidadeAmbienteFindOneQueryMetadata,
  ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler,
} from "../domain/queries/calendario-indisponibilidade-ambiente-find-one.query.handler.interface";
import {
  CalendarioIndisponibilidadeAmbienteListQueryMetadata,
  ICalendarioIndisponibilidadeAmbienteListQueryHandler,
} from "../domain/queries/calendario-indisponibilidade-ambiente-list.query.handler.interface";
import {
  CalendarioIndisponibilidadeAmbientePorPeriodoQueryMetadata,
  ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler,
} from "../domain/queries/calendario-indisponibilidade-ambiente-por-periodo.query.handler.interface";
import {
  CalendarioIndisponibilidadeAmbienteCreateInputRestDto,
  CalendarioIndisponibilidadeAmbienteFindOneInputRestDto,
  CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto,
  CalendarioIndisponibilidadeAmbienteListInputRestDto,
  CalendarioIndisponibilidadeAmbienteListOutputRestDto,
  CalendarioIndisponibilidadeAmbientePorPeriodoOutputRestDto,
  CalendarioIndisponibilidadeAmbientePorPeriodoQueryRestDto,
} from "./calendario-indisponibilidade-ambiente.rest.dto";
import * as CalendarioIndisponibilidadeAmbienteRestMapper from "./calendario-indisponibilidade-ambiente.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/indisponibilidades-ambiente")
export class CalendarioIndisponibilidadeAmbienteRestController {
  constructor(
    @Dep(ICalendarioIndisponibilidadeAmbienteListQueryHandler)
    private readonly listHandler: ICalendarioIndisponibilidadeAmbienteListQueryHandler,
    @Dep(ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler,
    @Dep(ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler)
    private readonly porPeriodoHandler: ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler,
    @Dep(ICalendarioIndisponibilidadeAmbienteCreateCommandHandler)
    private readonly createHandler: ICalendarioIndisponibilidadeAmbienteCreateCommandHandler,
    @Dep(ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioIndisponibilidadeAmbienteListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioIndisponibilidadeAmbienteListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioIndisponibilidadeAmbienteListInputRestDto,
  ): Promise<CalendarioIndisponibilidadeAmbienteListOutputRestDto> {
    const query = CalendarioIndisponibilidadeAmbienteRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioIndisponibilidadeAmbienteRestMapper.listQueryResultToListOutputDto(
      queryResult,
    );
  }

  @Get("/por-periodo")
  @ApiOperation(CalendarioIndisponibilidadeAmbientePorPeriodoQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioIndisponibilidadeAmbientePorPeriodoOutputRestDto })
  @ApiForbiddenResponse()
  async findByPeriodo(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioIndisponibilidadeAmbientePorPeriodoQueryRestDto,
  ): Promise<CalendarioIndisponibilidadeAmbientePorPeriodoOutputRestDto> {
    const query = CalendarioIndisponibilidadeAmbienteRestMapper.porPeriodoInputDtoToQuery.map(dto);
    const results = await this.porPeriodoHandler.execute(accessContext, query);
    return {
      data: CalendarioIndisponibilidadeAmbienteRestMapper.findOneQueryResultToOutputDto.mapArray(
        results,
      ),
    };
  }

  @Get("/:id")
  @ApiOperation(CalendarioIndisponibilidadeAmbienteFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioIndisponibilidadeAmbienteFindOneInputRestDto,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto> {
    const query =
      CalendarioIndisponibilidadeAmbienteRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, CalendarioIndisponibilidadeAmbiente.entityName, query.id);
    return CalendarioIndisponibilidadeAmbienteRestMapper.findOneQueryResultToOutputDto.map(
      queryResult,
    );
  }

  @Post("/")
  @ApiOperation(CalendarioIndisponibilidadeAmbienteCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioIndisponibilidadeAmbienteCreateInputRestDto,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto> {
    const command =
      CalendarioIndisponibilidadeAmbienteRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioIndisponibilidadeAmbienteRestMapper.findOneQueryResultToOutputDto.map(
      queryResult,
    );
  }

  @Delete("/:id")
  @ApiOperation(CalendarioIndisponibilidadeAmbienteDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioIndisponibilidadeAmbienteFindOneInputRestDto,
  ): Promise<boolean> {
    const query =
      CalendarioIndisponibilidadeAmbienteRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
