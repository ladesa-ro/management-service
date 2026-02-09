import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { OfertaFormacaoNivelFormacaoService } from "@/modules/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneOutputRestDto,
  OfertaFormacaoNivelFormacaoListInputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoUpdateInputRestDto,
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
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoNivelFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toListInput(dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma oferta de formacao nivel formacao por ID",
    operationId: "ofertaFormacaoNivelFormacaoFindById",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputRestDto> {
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
  @ApiCreatedResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoNivelFormacaoCreateInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.create(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoUpdate",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
    @Body() dto: OfertaFormacaoNivelFormacaoUpdateInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputRestDto> {
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
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toFindOneInput(params);
    return this.ofertaFormacaoNivelFormacaoService.deleteOneById(accessContext, input);
  }
}
