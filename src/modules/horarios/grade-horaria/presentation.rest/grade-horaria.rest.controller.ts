import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  GradeHorariaReplaceCommandMetadata,
  IGradeHorariaReplaceCommandHandler,
} from "@/modules/horarios/grade-horaria/domain/commands/grade-horaria-replace.command.handler.interface";
import {
  GradeHorariaFindByCampusQueryMetadata,
  IGradeHorariaFindByCampusQueryHandler,
} from "@/modules/horarios/grade-horaria/domain/queries/grade-horaria-find-by-campus.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  GradeHorariaCampusParamsRestDto,
  GradeHorariaListOutputRestDto,
  GradeHorariaReplaceInputRestDto,
} from "./grade-horaria.rest.dto";
import * as GradeHorariaRestMapper from "./grade-horaria.rest.mapper";

@ApiTags("grades-horarias")
@Controller("/grades-horarias")
export class GradeHorariaRestController {
  constructor(
    @DeclareDependency(IGradeHorariaFindByCampusQueryHandler)
    private readonly findByCampusHandler: IGradeHorariaFindByCampusQueryHandler,
    @DeclareDependency(IGradeHorariaReplaceCommandHandler)
    private readonly replaceHandler: IGradeHorariaReplaceCommandHandler,
  ) {}

  @Get("/:campusId")
  @ApiOperation(GradeHorariaFindByCampusQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: GradeHorariaListOutputRestDto })
  @ApiForbiddenResponse()
  async findByCampus(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: GradeHorariaCampusParamsRestDto,
  ): Promise<GradeHorariaListOutputRestDto> {
    const query = GradeHorariaRestMapper.findByCampusInputDtoToFindByCampusQuery.map(params);
    const queryResult = await this.findByCampusHandler.execute(accessContext, query);
    return GradeHorariaRestMapper.findByCampusQueryResultToOutputDto.map(queryResult);
  }

  @Put("/:campusId")
  @ApiOperation(GradeHorariaReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: GradeHorariaListOutputRestDto })
  @ApiForbiddenResponse()
  async replace(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: GradeHorariaCampusParamsRestDto,
    @Body() dto: GradeHorariaReplaceInputRestDto,
  ): Promise<GradeHorariaListOutputRestDto> {
    const command = GradeHorariaRestMapper.replaceInputDtoToReplaceCommand.map({ params, dto });
    const queryResult = await this.replaceHandler.execute(accessContext, command);
    return GradeHorariaRestMapper.findByCampusQueryResultToOutputDto.map(queryResult);
  }
}
