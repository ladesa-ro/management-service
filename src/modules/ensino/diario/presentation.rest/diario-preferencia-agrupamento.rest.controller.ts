import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  DiarioPreferenciaAgrupamentoBulkReplaceCommandMetadata,
  IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler,
} from "../domain/commands/diario-preferencia-agrupamento-bulk-replace.command.handler.interface";
import {
  DiarioPreferenciaAgrupamentoListQueryMetadata,
  IDiarioPreferenciaAgrupamentoListQueryHandler,
} from "../domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import {
  DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  DiarioPreferenciaAgrupamentoListInputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  DiarioPreferenciaAgrupamentoParentParamsRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";
import * as DiarioPreferenciaAgrupamentoRestMapper from "./diario-preferencia-agrupamento.rest.mapper";

@ApiTags("diarios")
@Controller("/diarios/:diarioId/preferencias-agrupamento")
export class DiarioPreferenciaAgrupamentoRestController {
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoListQueryHandler)
    private readonly listHandler: IDiarioPreferenciaAgrupamentoListQueryHandler,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler)
    private readonly bulkReplaceHandler: IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(DiarioPreferenciaAgrupamentoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
    @Query() dto: DiarioPreferenciaAgrupamentoListInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputRestDto> {
    const query = DiarioPreferenciaAgrupamentoRestMapper.listInputDtoToListQuery(parentParams, dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return DiarioPreferenciaAgrupamentoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Put("/")
  @ApiOperation(DiarioPreferenciaAgrupamentoBulkReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
    @Body() dto: DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputRestDto> {
    const command = DiarioPreferenciaAgrupamentoRestMapper.toBulkReplaceInput(parentParams, dto);
    const queryResult = await this.bulkReplaceHandler.execute(accessContext, command);
    return DiarioPreferenciaAgrupamentoRestMapper.listQueryResultToListOutputDto(queryResult);
  }
}
