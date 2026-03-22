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
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import {
  CalendarioLetivoCreateCommandMetadata,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import {
  CalendarioLetivoDeleteCommandMetadata,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import {
  CalendarioLetivoUpdateCommandMetadata,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import {
  CalendarioLetivoFindOneQueryMetadata,
  ICalendarioLetivoFindOneQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import {
  CalendarioLetivoListQueryMetadata,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import { AccessContextHttp } from "@/server/access-context";
import {
  CalendarioLetivoCreateInputRestDto,
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
  CalendarioLetivoListInputRestDto,
  CalendarioLetivoListOutputRestDto,
  CalendarioLetivoUpdateInputRestDto,
} from "./calendario-letivo.rest.dto";
import { CalendarioLetivoRestMapper } from "./calendario-letivo.rest.mapper";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoRestController {
  constructor(
    @DeclareDependency(ICalendarioLetivoListQueryHandler)
    private readonly listHandler: ICalendarioLetivoListQueryHandler,
    @DeclareDependency(ICalendarioLetivoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @DeclareDependency(ICalendarioLetivoCreateCommandHandler)
    private readonly createHandler: ICalendarioLetivoCreateCommandHandler,
    @DeclareDependency(ICalendarioLetivoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoUpdateCommandHandler,
    @DeclareDependency(ICalendarioLetivoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioLetivoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioLetivoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioLetivoListInputRestDto,
  ): Promise<CalendarioLetivoListOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return CalendarioLetivoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(CalendarioLetivoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, CalendarioLetivo.entityName, input.id);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(CalendarioLetivoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioLetivoCreateInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(CalendarioLetivoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
    @Body() dto: CalendarioLetivoUpdateInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation(CalendarioLetivoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
