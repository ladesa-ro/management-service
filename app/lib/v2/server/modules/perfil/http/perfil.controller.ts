import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilUpdateInputDto,
} from "./dto";

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
  ): Promise<PerfilFindOneOutputDto | null> {
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
  ): Promise<PerfilFindOneOutputDto | null> {
    return this.perfilService.perfilFindById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Define vinculos de um perfil" })
  @ApiCreatedResponse({ type: PerfilListOutputDto })
  @ApiForbiddenResponse()
  async setVinculos(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: PerfilFindOneInputDto & PerfilUpdateInputDto,
  ): Promise<PerfilListOutputDto> {
    return this.perfilService.perfilSetVinculos(accessContext, dto);
  }
}
