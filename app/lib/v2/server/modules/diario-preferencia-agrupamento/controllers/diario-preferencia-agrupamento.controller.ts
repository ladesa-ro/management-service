import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "@/v2/core/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "@/v2/adapters/in/http/diario-preferencia-agrupamento/dto";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios preferencia agrupamento" })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoListOutputDto })
  @ApiForbiddenResponse()
  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioPreferenciaAgrupamentoListInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputDto> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(
      accessContext,
      dto,
    );
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario preferencia agrupamento por ID" })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioPreferenciaAgrupamentoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioPreferenciaAgrupamentoFindOneInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(
      accessContext,
      params,
    );
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario preferencia agrupamento" })
  @ApiCreatedResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputDto })
  @ApiForbiddenResponse()
  async diarioPreferenciaAgrupamentoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(
      accessContext,
      dto,
    );
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario preferencia agrupamento" })
  @ApiOkResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioPreferenciaAgrupamentoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioPreferenciaAgrupamentoFindOneInputDto,
    @Body() dto: DiarioPreferenciaAgrupamentoUpdateInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(
      accessContext,
      { id: params.id, ...dto },
    );
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario preferencia agrupamento" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioPreferenciaAgrupamentoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioPreferenciaAgrupamentoFindOneInputDto,
  ): Promise<boolean> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(
      accessContext,
      params,
    );
  }
}
