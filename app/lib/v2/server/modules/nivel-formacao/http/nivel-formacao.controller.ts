import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "./dto";
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { BaseCrudController } from "@/v2/core/shared";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController extends BaseCrudController<
  NivelFormacaoService,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoCreateInputDto,
  NivelFormacaoUpdateInputDto
> {
  constructor(nivelFormacaoService: NivelFormacaoService) {
    super(nivelFormacaoService);
  }

  @Get("/")
  @ApiOperation({ summary: "Lista niveis de formacao" })
  @ApiOkResponse({ type: NivelFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async nivelFormacaoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: NivelFormacaoListInputDto,
  ): Promise<NivelFormacaoListOutputDto> {
    return this.handleFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um nivel de formacao por ID" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async nivelFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.handleFindById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um nivel de formacao" })
  @ApiCreatedResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async nivelFormacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.handleCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um nivel de formacao" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async nivelFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
    @Body() dto: NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.handleUpdate(accessContext, params, dto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um nivel de formacao" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async nivelFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.handleDelete(accessContext, params);
  }
}
