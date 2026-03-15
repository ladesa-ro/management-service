import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

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
    const listHandler = this.container.get<IDiarioPreferenciaAgrupamentoListQueryHandler>(
      IDiarioPreferenciaAgrupamentoListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
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
    const findOneHandler = this.container.get<IDiarioPreferenciaAgrupamentoFindOneQueryHandler>(
      IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, input);
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
    const createHandler = this.container.get<IDiarioPreferenciaAgrupamentoCreateCommandHandler>(
      IDiarioPreferenciaAgrupamentoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
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
    const updateHandler = this.container.get<IDiarioPreferenciaAgrupamentoUpdateCommandHandler>(
      IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
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
    const deleteHandler = this.container.get<IDiarioPreferenciaAgrupamentoDeleteCommandHandler>(
      IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, input);
  }
}
