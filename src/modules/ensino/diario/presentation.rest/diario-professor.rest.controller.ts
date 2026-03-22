import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import { IDiarioProfessorBulkReplaceCommandHandler } from "../domain/commands/diario-professor-bulk-replace.command.handler.interface";
import { IDiarioProfessorListQueryHandler } from "../domain/queries/diario-professor-list.query.handler.interface";
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
  @ApiOperation({
    summary: "Lista professores de um diario",
    operationId: "diarioProfessorFindAll",
  })
  @ApiOkResponse({ type: DiarioProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() parentParams: DiarioProfessorParentParamsRestDto,
    @Query() dto: DiarioProfessorListInputRestDto,
  ): Promise<DiarioProfessorListOutputRestDto> {
    const input = DiarioProfessorRestMapper.toListInput(parentParams, dto);
    const result = await this.listHandler.execute(accessContext, input as any);
    return DiarioProfessorRestMapper.toListOutputDto(result as any);
  }

  @Put("/")
  @ApiOperation({
    summary: "Substitui professores de um diario",
    operationId: "diarioProfessorBulkReplace",
  })
  @ApiOkResponse({ type: DiarioProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() parentParams: DiarioProfessorParentParamsRestDto,
    @Body() dto: DiarioProfessorBulkReplaceInputRestDto,
  ): Promise<DiarioProfessorListOutputRestDto> {
    const input = DiarioProfessorRestMapper.toBulkReplaceInput(parentParams, dto);
    const result = await this.bulkReplaceHandler.execute(accessContext, input as any);
    return DiarioProfessorRestMapper.toListOutputDto(result as any);
  }
}
