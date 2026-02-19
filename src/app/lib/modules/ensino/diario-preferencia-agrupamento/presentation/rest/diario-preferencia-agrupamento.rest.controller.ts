import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { DiarioPreferenciaAgrupamentoService } from "@/modules/ensino/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
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
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

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
    const result = await this.diarioPreferenciaAgrupamentoService.findAll(accessContext, input);
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
    const result = await this.diarioPreferenciaAgrupamentoService.findByIdStrict(
      accessContext,
      input,
    );
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
    const result = await this.diarioPreferenciaAgrupamentoService.create(accessContext, input);
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
    const result = await this.diarioPreferenciaAgrupamentoService.update(accessContext, input);
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
    return this.diarioPreferenciaAgrupamentoService.deleteOneById(accessContext, input);
  }
}
