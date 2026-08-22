import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  ITurmaMatriculaDesvincularCommandHandler,
  TurmaMatriculaDesvincularCommandMetadata,
} from "../domain/commands/turma-matricula-desvincular.command.handler.interface";
import {
  ITurmaMatriculaVincularCommandHandler,
  TurmaMatriculaVincularCommandMetadata,
} from "../domain/commands/turma-matricula-vincular.command.handler.interface";
import {
  ITurmaMatriculaListQueryHandler,
  TurmaMatriculaListQueryMetadata,
} from "../domain/queries/turma-matricula-list.query.handler.interface";
import {
  TurmaMatriculaFindOneOutputRestDto,
  TurmaMatriculaFindOneParamsRestDto,
  TurmaMatriculaListInputRestDto,
  TurmaMatriculaListOutputRestDto,
  TurmaMatriculaVincularInputRestDto,
} from "./turma-matricula.rest.dto";
import * as TurmaMatriculaRestMapper from "./turma-matricula.rest.mapper";

@ApiTags("turmas")
@Controller("/matriculas")
export class TurmaMatriculaRestController {
  constructor(
    @Dep(ITurmaMatriculaListQueryHandler)
    private readonly listHandler: ITurmaMatriculaListQueryHandler,
    @Dep(ITurmaMatriculaVincularCommandHandler)
    private readonly vincularHandler: ITurmaMatriculaVincularCommandHandler,
    @Dep(ITurmaMatriculaDesvincularCommandHandler)
    private readonly desvincularHandler: ITurmaMatriculaDesvincularCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(TurmaMatriculaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaMatriculaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: TurmaMatriculaListInputRestDto,
  ): Promise<TurmaMatriculaListOutputRestDto> {
    const query = TurmaMatriculaRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return TurmaMatriculaRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Post("/")
  @ApiOperation(TurmaMatriculaVincularCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: TurmaMatriculaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async vincular(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: TurmaMatriculaVincularInputRestDto,
  ): Promise<TurmaMatriculaFindOneOutputRestDto> {
    const command = TurmaMatriculaRestMapper.vincularInputDtoToVincularCommand.map(dto);
    const queryResult = await this.vincularHandler.execute(accessContext, command);
    return TurmaMatriculaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(TurmaMatriculaDesvincularCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async desvincular(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaMatriculaFindOneParamsRestDto,
  ): Promise<boolean> {
    const query = TurmaMatriculaRestMapper.findOneParamsInputDtoToFindOneQuery.map(params);
    return this.desvincularHandler.execute(accessContext, query);
  }
}
