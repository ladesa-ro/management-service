import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { PerfilService } from "@/modules/perfil";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilSetVinculosInputDto,
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
  @ApiOperation({
    summary: "Define vinculos (cargos) de um usuario em um campus",
    description:
      "Define os cargos que um usuario possui em um campus. " +
      "Cargos existentes que nao estiverem na lista serao desativados. " +
      "Cargos novos serao criados ou reativados.",
    operationId: "perfilSetVinculos",
  })
  @ApiCreatedResponse({
    type: PerfilListOutputDto,
    description: "Lista de perfis ativos do usuario no campus apos a operacao",
  })
  @ApiForbiddenResponse()
  async setVinculos(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: PerfilSetVinculosInputDto,
  ): Promise<PerfilListOutputDto> {
    return this.perfilService.setVinculos(
      accessContext,
      dto as any,
    ) as unknown as Promise<PerfilListOutputDto>;
  }
}
