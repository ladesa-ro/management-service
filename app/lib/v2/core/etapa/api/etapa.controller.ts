import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EtapaService } from "../domain/etapa.service";
import {
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaCreateInputDto,
  EtapaUpdateInputDto,
  EtapaFindOneInputDto,
} from "../dto";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista etapas" })
  @ApiOkResponse({ type: EtapaListOutputDto })
  @ApiForbiddenResponse()
  async etapaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EtapaListInputDto,
  ): Promise<EtapaListOutputDto> {
    return this.etapaService.etapaFindAll(accessContext, dto);
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
    return this.etapaService.etapaFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma etapa" })
  @ApiCreatedResponse({ type: EtapaFindOneOutputDto })
  @ApiForbiddenResponse()
  async etapaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EtapaCreateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.etapaService.etapaCreate(accessContext, dto);
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
    return this.etapaService.etapaUpdate(accessContext, { id: params.id, ...dto });
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
    return this.etapaService.etapaDeleteOneById(accessContext, params);
  }
}
