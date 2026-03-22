import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import { CalendarioLetivoDia } from "../domain/calendario-letivo-dia";
import {
  CalendarioLetivoDiaUpdateCommandMetadata,
  ICalendarioLetivoDiaUpdateCommandHandler,
} from "../domain/commands/calendario-letivo-dia-update.command.handler.interface";
import {
  CalendarioLetivoDiaFindOneQueryMetadata,
  ICalendarioLetivoDiaFindOneQueryHandler,
} from "../domain/queries/calendario-letivo-dia-find-one.query.handler.interface";
import {
  CalendarioLetivoDiaListQueryMetadata,
  ICalendarioLetivoDiaListQueryHandler,
} from "../domain/queries/calendario-letivo-dia-list.query.handler.interface";
import {
  CalendarioLetivoDiaFindByDataParamsRestDto,
  CalendarioLetivoDiaFindOneOutputRestDto,
  CalendarioLetivoDiaListInputRestDto,
  CalendarioLetivoDiaListOutputRestDto,
  CalendarioLetivoDiaParentParamsRestDto,
  CalendarioLetivoDiaUpdateInputRestDto,
} from "./calendario-letivo-dia.rest.dto";
import { CalendarioLetivoDiaRestMapper } from "./calendario-letivo-dia.rest.mapper";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos/:calendarioLetivoId/dias")
export class CalendarioLetivoDiaRestController {
  constructor(
    @DeclareDependency(ICalendarioLetivoDiaListQueryHandler)
    private readonly listHandler: ICalendarioLetivoDiaListQueryHandler,
    @DeclareDependency(ICalendarioLetivoDiaFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoDiaFindOneQueryHandler,
    @DeclareDependency(ICalendarioLetivoDiaUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoDiaUpdateCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioLetivoDiaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoDiaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() parentParams: CalendarioLetivoDiaParentParamsRestDto,
    @Query() dto: CalendarioLetivoDiaListInputRestDto,
  ): Promise<CalendarioLetivoDiaListOutputRestDto> {
    const input = CalendarioLetivoDiaRestMapper.toListInput(parentParams, dto);
    const result = await this.listHandler.execute(accessContext, input as any);
    return CalendarioLetivoDiaRestMapper.toListOutputDto(result as any);
  }

  @Get("/:data")
  @ApiOperation(CalendarioLetivoDiaFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoDiaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findByData(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoDiaFindByDataParamsRestDto,
  ): Promise<CalendarioLetivoDiaFindOneOutputRestDto> {
    const input = CalendarioLetivoDiaRestMapper.toFindByDataInput(params);
    const result = await this.findOneHandler.execute(accessContext, input as any);
    ensureExists(result, CalendarioLetivoDia.entityName, params.data);
    return CalendarioLetivoDiaRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:data")
  @ApiOperation(CalendarioLetivoDiaUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoDiaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoDiaFindByDataParamsRestDto,
    @Body() dto: CalendarioLetivoDiaUpdateInputRestDto,
  ): Promise<CalendarioLetivoDiaFindOneOutputRestDto> {
    const input = CalendarioLetivoDiaRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input as any);
    return CalendarioLetivoDiaRestMapper.toFindOneOutputDto(result as any);
  }
}
