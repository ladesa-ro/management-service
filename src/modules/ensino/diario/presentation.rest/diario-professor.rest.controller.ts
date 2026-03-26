import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
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
import * as DiarioProfessorRestMapper from "./diario-professor.rest.mapper";

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
    const query = DiarioProfessorRestMapper.listInputDtoToListQuery(parentParams, dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return DiarioProfessorRestMapper.listQueryResultToListOutputDto(queryResult);
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
    const command = DiarioProfessorRestMapper.toBulkReplaceInput(parentParams, dto);
    const queryResult = await this.bulkReplaceHandler.execute(accessContext, command);
    return DiarioProfessorRestMapper.listQueryResultToListOutputDto(queryResult);
  }
}
