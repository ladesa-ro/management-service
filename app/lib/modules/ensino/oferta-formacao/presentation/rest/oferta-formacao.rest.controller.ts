import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import {
  OfertaFormacaoCreateInputRestDto,
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  OfertaFormacaoListInputRestDto,
  OfertaFormacaoListOutputRestDto,
  OfertaFormacaoUpdateInputRestDto,
} from "./oferta-formacao.rest.dto";
import { OfertaFormacaoRestMapper } from "./oferta-formacao.rest.mapper";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoRestController {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ofertas de formacao", operationId: "ofertaFormacaoFindAll" })
  @ApiOkResponse({ type: OfertaFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoListOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toListInput(dto);
    const result = await this.ofertaFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma oferta de formacao por ID",
    operationId: "ofertaFormacaoFindById",
  })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    const result = await this.ofertaFormacaoService.findByIdStrict(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma oferta de formacao", operationId: "ofertaFormacaoCreate" })
  @ApiCreatedResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoCreateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoService.create(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma oferta de formacao", operationId: "ofertaFormacaoUpdate" })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
    @Body() dto: OfertaFormacaoUpdateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toUpdateInput(params, dto);
    const result = await this.ofertaFormacaoService.update(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma oferta de formacao",
    operationId: "ofertaFormacaoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    return this.ofertaFormacaoService.deleteOneById(accessContext, input);
  }
}
