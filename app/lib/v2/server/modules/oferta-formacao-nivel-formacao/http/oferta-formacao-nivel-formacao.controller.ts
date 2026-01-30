import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { OfertaFormacaoNivelFormacaoService } from "@/core/oferta-formacao-nivel-formacao";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "./dto";

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
    return this.ofertaFormacaoNivelFormacaoService.findAll(
      accessContext,
      dto,
    ) as unknown as Promise<OfertaFormacaoNivelFormacaoListOutputDto>;
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
    return this.ofertaFormacaoNivelFormacaoService.findByIdStrict(
      accessContext,
      params,
    ) as unknown as Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma oferta de formacao nivel formacao" })
  @ApiCreatedResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async ofertaFormacaoNivelFormacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoNivelFormacaoService.createOne(
      accessContext,
      dto,
    ) as unknown as Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;
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
    return this.ofertaFormacaoNivelFormacaoService.update(
      accessContext,
      { id: params.id, ...dto },
    ) as unknown as Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;
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
    return this.ofertaFormacaoNivelFormacaoService.deleteById(
      accessContext,
      params,
    );
  }
}
