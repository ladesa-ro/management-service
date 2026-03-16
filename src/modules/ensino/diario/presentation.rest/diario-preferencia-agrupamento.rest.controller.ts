import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler } from "../domain/commands/diario-preferencia-agrupamento-bulk-replace.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoListQueryHandler } from "../domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import {
  DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  DiarioPreferenciaAgrupamentoListInputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  DiarioPreferenciaAgrupamentoParentParamsRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";
import { DiarioPreferenciaAgrupamentoRestMapper } from "./diario-preferencia-agrupamento.rest.mapper";

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
  @ApiOperation({ summary: "Lista preferencias de agrupamento de um diario", operationId: "diarioPreferenciaAgrupamentoFindAll" })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
    @Query() dto: DiarioPreferenciaAgrupamentoListInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputRestDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toListInput(parentParams, dto);
    const result = await this.listHandler.execute(accessContext, input as any);
    return DiarioPreferenciaAgrupamentoRestMapper.toListOutputDto(result as any);
  }

  @Put("/")
  @ApiOperation({ summary: "Substitui preferencias de agrupamento de um diario", operationId: "diarioPreferenciaAgrupamentoBulkReplace" })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
    @Body() dto: DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputRestDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toBulkReplaceInput(parentParams, dto);
    const result = await this.bulkReplaceHandler.execute(accessContext, input as any);
    return DiarioPreferenciaAgrupamentoRestMapper.toListOutputDto(result as any);
  }
}
