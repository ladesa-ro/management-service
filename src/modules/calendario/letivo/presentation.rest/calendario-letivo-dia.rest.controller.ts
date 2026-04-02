import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import {
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
import * as CalendarioLetivoDiaRestMapper from "./calendario-letivo-dia.rest.mapper";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos/:calendarioLetivoId/dias")
export class CalendarioLetivoDiaRestController {
  constructor(
    @Dep(ICalendarioLetivoDiaListQueryHandler)
    private readonly listHandler: ICalendarioLetivoDiaListQueryHandler,
    @Dep(ICalendarioLetivoDiaFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoDiaFindOneQueryHandler,
    @Dep(ICalendarioLetivoDiaUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoDiaUpdateCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioLetivoDiaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoDiaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: CalendarioLetivoDiaParentParamsRestDto,
    @Query() dto: CalendarioLetivoDiaListInputRestDto,
  ): Promise<CalendarioLetivoDiaListOutputRestDto> {
    const query = CalendarioLetivoDiaRestMapper.listInputDtoToListQuery(parentParams, dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioLetivoDiaRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:data")
  @ApiOperation(CalendarioLetivoDiaFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoDiaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findByData(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioLetivoDiaFindByDataParamsRestDto,
  ): Promise<CalendarioLetivoDiaFindOneOutputRestDto> {
    const query = CalendarioLetivoDiaRestMapper.toFindByDataInput.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, CalendarioLetivoDia.entityName, params.data);
    return CalendarioLetivoDiaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:data")
  @ApiOperation(CalendarioLetivoDiaUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoDiaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioLetivoDiaFindByDataParamsRestDto,
    @Body() dto: CalendarioLetivoDiaUpdateInputRestDto,
  ): Promise<CalendarioLetivoDiaFindOneOutputRestDto> {
    const command = CalendarioLetivoDiaRestMapper.updateInputDtoToUpdateCommand.map({
      params,
      dto,
    });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CalendarioLetivoDiaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
