import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { OfertaFormacaoNivelFormacaoService } from "@/modules/oferta-formacao-nivel-formacao";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";
import { OfertaFormacaoNivelFormacaoRestMapper } from "./oferta-formacao-nivel-formacao.rest.mapper";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoRestController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista ofertas de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoFindAll",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoNivelFormacaoListInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toListInput(dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma oferta de formacao nivel formacao por ID",
    operationId: "ofertaFormacaoNivelFormacaoFindById",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toFindOneInput(params);
    const result = await this.ofertaFormacaoNivelFormacaoService.findByIdStrict(
      accessContext,
      input,
    );
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoCreate",
  })
  @ApiCreatedResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.create(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoUpdate",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputDto,
    @Body() dto: OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toUpdateInput(params, dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.update(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toFindOneInput(params);
    return this.ofertaFormacaoNivelFormacaoService.deleteOneById(accessContext, input);
  }
}
