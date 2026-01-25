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
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/v2/adapters/in/http/oferta-formacao/dto";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoController {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ofertas de formacao" })
  @ApiOkResponse({ type: OfertaFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async ofertaFormacaoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoListInputDto,
  ): Promise<OfertaFormacaoListOutputDto> {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma oferta de formacao por ID" })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ofertaFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma oferta de formacao" })
  @ApiCreatedResponse({ type: OfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async ofertaFormacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma oferta de formacao" })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ofertaFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputDto,
    @Body() dto: OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, {
      id: params.id,
      ...dto,
    });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma oferta de formacao" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ofertaFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, params);
  }
}
