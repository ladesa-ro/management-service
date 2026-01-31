import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { PerfilService } from "@/core/perfil";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilUpdateInputDto,
} from "./perfil.rest.dto";

@ApiTags("perfis")
@Controller("/perfis")
export class PerfilRestController {
  constructor(private perfilService: PerfilService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista perfis", operationId: "perfilFindAll" })
  @ApiOkResponse({ type: PerfilListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: PerfilListInputDto,
  ): Promise<PerfilListOutputDto> {
    return this.perfilService.findAll(
      accessContext,
      dto as any,
    ) as unknown as Promise<PerfilListOutputDto>;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um perfil por ID", operationId: "perfilFindById" })
  @ApiOkResponse({ type: PerfilFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto | null> {
    return this.perfilService.findById(
      accessContext,
      params as any,
    ) as unknown as Promise<PerfilFindOneOutputDto | null>;
  }

  @Get("/:id/ensino")
  @ApiOperation({ summary: "Busca dados de ensino de um perfil", operationId: "perfilEnsinoById" })
  @ApiOkResponse({ type: PerfilFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto | null> {
    return this.perfilService.findById(
      accessContext,
      params as any,
    ) as unknown as Promise<PerfilFindOneOutputDto | null>;
  }

  @Post("/")
  @ApiOperation({ summary: "Define vinculos de um perfil", operationId: "perfilSetVinculos" })
  @ApiCreatedResponse({ type: PerfilListOutputDto })
  @ApiForbiddenResponse()
  async setVinculos(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: PerfilFindOneInputDto & PerfilUpdateInputDto,
  ): Promise<PerfilListOutputDto> {
    return this.perfilService.setVinculos(
      accessContext,
      dto as any,
    ) as unknown as Promise<PerfilListOutputDto>;
  }
}
