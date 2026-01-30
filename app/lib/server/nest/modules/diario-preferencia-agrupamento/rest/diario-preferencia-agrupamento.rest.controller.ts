import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DiarioPreferenciaAgrupamentoService } from "@/core/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "./diario-preferencia-agrupamento.rest.dto";
import { DiarioPreferenciaAgrupamentoRestMapper } from "./diario-preferencia-agrupamento.rest.mapper";

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
    const input = DiarioPreferenciaAgrupamentoRestMapper.toListInput(dto);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoRestMapper.toListOutputDto(result);
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
    const input = DiarioPreferenciaAgrupamentoRestMapper.toFindOneInput(params);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario preferencia agrupamento" })
  @ApiCreatedResponse({ type: DiarioPreferenciaAgrupamentoFindOneOutputDto })
  @ApiForbiddenResponse()
  async diarioPreferenciaAgrupamentoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toCreateInput(dto);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(result);
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
    const input = DiarioPreferenciaAgrupamentoRestMapper.toUpdateInput(params, dto);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(result);
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
    const input = DiarioPreferenciaAgrupamentoRestMapper.toFindOneInput(params);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(
      accessContext,
      input,
    );
  }
}
