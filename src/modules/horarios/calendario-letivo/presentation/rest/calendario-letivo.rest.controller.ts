import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import { ICalendarioLetivoCreateCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import { ICalendarioLetivoDeleteCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import { ICalendarioLetivoUpdateCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { ICalendarioLetivoListQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista calendarios letivos", operationId: "calendarioLetivoFindAll" })
  @ApiOkResponse({ type: CalendarioLetivoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CalendarioLetivoListInputRestDto,
  ): Promise<CalendarioLetivoListOutputRestDto> {
    const listHandler = this.container.get<ICalendarioLetivoListQueryHandler>(
      ICalendarioLetivoListQueryHandler,
    );
    const input = CalendarioLetivoRestMapper.toListInput(dto);
    const result = await listHandler.execute(accessContext, input);
    return CalendarioLetivoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um calendario letivo por ID",
    operationId: "calendarioLetivoFindById",
  })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const findOneHandler = this.container.get<ICalendarioLetivoFindOneQueryHandler>(
      ICalendarioLetivoFindOneQueryHandler,
    );
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    const result = await findOneHandler.execute(accessContext, input);
    ensureExists(result, CalendarioLetivo.entityName, input.id);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um calendario letivo", operationId: "calendarioLetivoCreate" })
  @ApiCreatedResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CalendarioLetivoCreateInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const createHandler = this.container.get<ICalendarioLetivoCreateCommandHandler>(
      ICalendarioLetivoCreateCommandHandler,
    );
    const input = CalendarioLetivoRestMapper.toCreateInput(dto);
    const result = await createHandler.execute(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um calendario letivo", operationId: "calendarioLetivoUpdate" })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
    @Body() dto: CalendarioLetivoUpdateInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const updateHandler = this.container.get<ICalendarioLetivoUpdateCommandHandler>(
      ICalendarioLetivoUpdateCommandHandler,
    );
    const input = CalendarioLetivoRestMapper.toUpdateInput(params, dto);
    const result = await updateHandler.execute(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um calendario letivo",
    operationId: "calendarioLetivoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<ICalendarioLetivoDeleteCommandHandler>(
      ICalendarioLetivoDeleteCommandHandler,
    );
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    return deleteHandler.execute(accessContext, input);
  }
}
