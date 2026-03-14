import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IDiarioPreferenciaAgrupamentoCreateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoDeleteCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoUpdateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import { IDiarioPreferenciaAgrupamentoFindOneQueryHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-find-one.query.handler.interface";
import { IDiarioPreferenciaAgrupamentoListQueryHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import {
  DiarioPreferenciaAgrupamentoCreateInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneOutputRestDto,
  DiarioPreferenciaAgrupamentoListInputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  DiarioPreferenciaAgrupamentoUpdateInputRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";
import { DiarioPreferenciaAgrupamentoRestMapper } from "./diario-preferencia-agrupamento.rest.mapper";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoListQueryHandler)
    private readonly listHandler: IDiarioPreferenciaAgrupamentoListQueryHandler,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoFindOneQueryHandler)
    private readonly findOneHandler: IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoCreateCommandHandler)
    private readonly createHandler: IDiarioPreferenciaAgrupamentoCreateCommandHandler,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoUpdateCommandHandler)
    private readonly updateHandler: IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoDeleteCommandHandler)
    private readonly deleteHandler: IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista diarios preferencia agrupamento",
    operationId: "diarioPreferenciaAgrupamentoFindAll",
  })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioPreferenciaAgrupamentoListInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputRestDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
    return DiarioPreferenciaAgrupamentoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um diario preferencia agrupamento por ID",
    operationId: "diarioPreferenciaAgrupamentoFindById",
  })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioPreferenciaAgrupamentoFindOneInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputRestDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, DiarioPreferenciaAgrupamento.entityName, input.id);
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria um diario preferencia agrupamento",
    operationId: "diarioPreferenciaAgrupamentoCreate",
  })
  @ApiCreatedResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioPreferenciaAgrupamentoCreateInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputRestDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza um diario preferencia agrupamento",
    operationId: "diarioPreferenciaAgrupamentoUpdate",
  })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioPreferenciaAgrupamentoFindOneInputRestDto,
    @Body() dto: DiarioPreferenciaAgrupamentoUpdateInputRestDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputRestDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um diario preferencia agrupamento",
    operationId: "diarioPreferenciaAgrupamentoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioPreferenciaAgrupamentoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
