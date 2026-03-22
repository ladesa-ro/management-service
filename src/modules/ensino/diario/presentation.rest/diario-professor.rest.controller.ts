import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/access-context";
import {
  DiarioProfessorBulkReplaceCommandMetadata,
  IDiarioProfessorBulkReplaceCommandHandler,
} from "../domain/commands/diario-professor-bulk-replace.command.handler.interface";
import {
  DiarioProfessorListQueryMetadata,
  IDiarioProfessorListQueryHandler,
} from "../domain/queries/diario-professor-list.query.handler.interface";
import {
  DiarioProfessorBulkReplaceInputRestDto,
  DiarioProfessorListInputRestDto,
  DiarioProfessorListOutputRestDto,
  DiarioProfessorParentParamsRestDto,
} from "./diario-professor.rest.dto";
import { DiarioProfessorRestMapper } from "./diario-professor.rest.mapper";

@ApiTags("diarios")
@Controller("/diarios/:diarioId/professores")
export class DiarioProfessorRestController {
  constructor(
    @DeclareDependency(IDiarioProfessorListQueryHandler)
    private readonly listHandler: IDiarioProfessorListQueryHandler,
    @DeclareDependency(IDiarioProfessorBulkReplaceCommandHandler)
    private readonly bulkReplaceHandler: IDiarioProfessorBulkReplaceCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(DiarioProfessorListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: DiarioProfessorParentParamsRestDto,
    @Query() dto: DiarioProfessorListInputRestDto,
  ): Promise<DiarioProfessorListOutputRestDto> {
    const input = DiarioProfessorRestMapper.toListInput(parentParams, dto);
    const result = await this.listHandler.execute(accessContext, input);
    return DiarioProfessorRestMapper.toListOutputDto(result);
  }

  @Put("/")
  @ApiOperation(DiarioProfessorBulkReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: DiarioProfessorParentParamsRestDto,
    @Body() dto: DiarioProfessorBulkReplaceInputRestDto,
  ): Promise<DiarioProfessorListOutputRestDto> {
    const input = DiarioProfessorRestMapper.toBulkReplaceInput(parentParams, dto);
    const result = await this.bulkReplaceHandler.execute(accessContext, input);
    return DiarioProfessorRestMapper.toListOutputDto(result);
  }
}
