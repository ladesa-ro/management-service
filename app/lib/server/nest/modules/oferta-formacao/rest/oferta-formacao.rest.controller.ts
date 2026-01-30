import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { OfertaFormacaoService } from "@/core/oferta-formacao";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "./oferta-formacao.rest.dto";
import { OfertaFormacaoRestMapper } from "./oferta-formacao.rest.mapper";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoRestController {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ofertas de formacao" })
  @ApiOkResponse({ type: OfertaFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoListInputDto,
  ): Promise<OfertaFormacaoListOutputDto> {
    const input = OfertaFormacaoRestMapper.toListInput(dto);
    const result = await this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, input);
    return OfertaFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma oferta de formacao por ID" })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    const result = await this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(
      accessContext,
      input,
    );
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma oferta de formacao" })
  @ApiCreatedResponse({ type: OfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoRestMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma oferta de formacao" })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputDto,
    @Body() dto: OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoRestMapper.toUpdateInput(params, dto);
    const result = await this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma oferta de formacao" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, input);
  }
}
