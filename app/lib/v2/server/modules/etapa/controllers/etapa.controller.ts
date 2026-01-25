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
import {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "@/v2/adapters/in/http/etapa/dto";
import { EtapaService } from "@/v2/core/etapa/application/use-cases/etapa.service";
import { BaseCrudController } from "@/v2/core/shared";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController extends BaseCrudController<
  EtapaService,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaCreateInputDto,
  EtapaUpdateInputDto
> {
  constructor(etapaService: EtapaService) {
    super(etapaService);
  }

  @Get("/")
  @ApiOperation({ summary: "Lista etapas" })
  @ApiOkResponse({ type: EtapaListOutputDto })
  @ApiForbiddenResponse()
  async etapaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EtapaListInputDto,
  ): Promise<EtapaListOutputDto> {
    return this.handleFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma etapa por ID" })
  @ApiOkResponse({ type: EtapaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async etapaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.handleFindById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma etapa" })
  @ApiCreatedResponse({ type: EtapaFindOneOutputDto })
  @ApiForbiddenResponse()
  async etapaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EtapaCreateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.handleCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma etapa" })
  @ApiOkResponse({ type: EtapaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async etapaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputDto,
    @Body() dto: EtapaUpdateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.handleUpdate(accessContext, params, dto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma etapa" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async etapaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputDto,
  ): Promise<boolean> {
    return this.handleDelete(accessContext, params);
  }
}
