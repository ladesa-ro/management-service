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
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "./dto";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista niveis de formacao" })
  @ApiOkResponse({ type: NivelFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async nivelformacaoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: NivelFormacaoListInputDto,
  ): Promise<NivelFormacaoListOutputDto> {
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um nivel de formacao por ID" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async nivelformacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.nivelformacaoService.nivelFormacaoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um nivel de formacao" })
  @ApiCreatedResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async nivelformacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um nivel de formacao" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async nivelformacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
    @Body() dto: NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um nivel de formacao" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async nivelformacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, params);
  }
}
