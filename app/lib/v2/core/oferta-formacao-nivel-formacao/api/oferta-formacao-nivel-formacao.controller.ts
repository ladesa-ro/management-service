import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { OfertaFormacaoNivelFormacaoService } from "../domain/oferta-formacao-nivel-formacao.service";
import {
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
} from "../dto";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ofertas de formacao nivel formacao" })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async ofertaFormacaoNivelFormacaoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoNivelFormacaoListInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputDto> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma oferta de formacao nivel formacao por ID" })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ofertaFormacaoNivelFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma oferta de formacao nivel formacao" })
  @ApiCreatedResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async ofertaFormacaoNivelFormacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma oferta de formacao nivel formacao" })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ofertaFormacaoNivelFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputDto,
    @Body() dto: OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma oferta de formacao nivel formacao" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, params);
  }
}
