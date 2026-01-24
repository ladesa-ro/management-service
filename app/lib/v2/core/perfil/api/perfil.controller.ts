import { Controller, Get, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { PerfilService } from "../domain/perfil.service";
import {
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilUpdateInputDto,
  PerfilFindOneInputDto,
} from "../dto";

@ApiTags("perfis")
@Controller("/perfis")
export class PerfilController {
  constructor(private perfilService: PerfilService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista perfis" })
  @ApiOkResponse({ type: PerfilListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: PerfilListInputDto,
  ): Promise<PerfilListOutputDto> {
    return this.perfilService.perfilFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um perfil por ID" })
  @ApiOkResponse({ type: PerfilFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async perfilFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto> {
    return this.perfilService.perfilFindById(accessContext, params);
  }

  @Get("/:id/ensino")
  @ApiOperation({ summary: "Busca dados de ensino de um perfil" })
  @ApiOkResponse({ type: PerfilFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async perfilEnsinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto> {
    return this.perfilService.perfilFindById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Define vinculos de um perfil" })
  @ApiCreatedResponse({ type: PerfilFindOneOutputDto })
  @ApiForbiddenResponse()
  async setVinculos(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: PerfilUpdateInputDto,
  ): Promise<PerfilFindOneOutputDto> {
    return this.perfilService.perfilSetVinculos(accessContext, dto);
  }
}
