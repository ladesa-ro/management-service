import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  HorariosDeAulaReplaceCommandMetadata,
  IHorariosDeAulaReplaceCommandHandler,
} from "@/modules/horarios/horarios-de-aula/domain/commands/horarios-de-aula-replace.command.handler.interface";
import {
  HorariosDeAulaFindAtualQueryMetadata,
  IHorariosDeAulaFindAtualQueryHandler,
} from "@/modules/horarios/horarios-de-aula/domain/queries/horarios-de-aula-find-atual.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  HorarioDeAulaCampusParamsRestDto,
  HorarioDeAulaListOutputRestDto,
  HorarioDeAulaReplaceInputRestDto,
} from "./horario-aula-configuracao.rest.dto";
import * as HorariosDeAulaRestMapper from "./horario-aula-configuracao.rest.mapper";

@ApiTags("horarios-de-aula")
@Controller("/horarios-de-aula")
export class HorarioDeAulaRestController {
  constructor(
    @DeclareDependency(IHorariosDeAulaFindAtualQueryHandler)
    private readonly findAtualHandler: IHorariosDeAulaFindAtualQueryHandler,
    @DeclareDependency(IHorariosDeAulaReplaceCommandHandler)
    private readonly replaceHandler: IHorariosDeAulaReplaceCommandHandler,
  ) {}

  @Get("/:campusId/atual")
  @ApiOperation(HorariosDeAulaFindAtualQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioDeAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAtual(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: HorarioDeAulaCampusParamsRestDto,
  ): Promise<HorarioDeAulaListOutputRestDto> {
    const query = HorariosDeAulaRestMapper.findAtualInputDtoToFindAtualQuery.map(params);
    const queryResult = await this.findAtualHandler.execute(accessContext, query);
    return HorariosDeAulaRestMapper.findAtualQueryResultToOutputDto.map(queryResult);
  }

  @Put("/:campusId")
  @ApiOperation(HorariosDeAulaReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioDeAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async replace(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: HorarioDeAulaCampusParamsRestDto,
    @Body() dto: HorarioDeAulaReplaceInputRestDto,
  ): Promise<HorarioDeAulaListOutputRestDto> {
    const command = HorariosDeAulaRestMapper.replaceInputDtoToReplaceCommand.map({ params, dto });
    const queryResult = await this.replaceHandler.execute(accessContext, command);
    return HorariosDeAulaRestMapper.findAtualQueryResultToOutputDto.map(queryResult);
  }
}
