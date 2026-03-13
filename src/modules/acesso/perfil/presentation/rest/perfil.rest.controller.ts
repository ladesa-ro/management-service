import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { PerfilService } from "@/modules/acesso/perfil";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
  PerfilListInputRestDto,
  PerfilListOutputRestDto,
  PerfilSetVinculosInputRestDto,
} from "./perfil.rest.dto";
import { PerfilRestMapper } from "./perfil.rest.mapper";

@ApiTags("perfis")
@Controller("/perfis")
export class PerfilRestController {
  constructor(private perfilService: PerfilService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista perfis", operationId: "perfilFindAll" })
  @ApiOkResponse({ type: PerfilListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: PerfilListInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const input = PerfilRestMapper.toListInput(dto);
    const result = await this.perfilService.findAll(accessContext, input);
    return PerfilRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um perfil por ID", operationId: "perfilFindById" })
  @ApiOkResponse({ type: PerfilFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: PerfilFindOneInputRestDto,
  ): Promise<PerfilFindOneOutputRestDto | null> {
    const input = PerfilRestMapper.toFindOneInput(params);
    const result = await this.perfilService.findById(accessContext, input);
    return result ? PerfilRestMapper.toFindOneOutputDto(result) : null;
  }

  @Get("/:id/ensino")
  @ApiOperation({ summary: "Busca dados de ensino de um perfil", operationId: "perfilEnsinoById" })
  @ApiOkResponse({ type: PerfilFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: PerfilFindOneInputRestDto,
  ): Promise<PerfilFindOneOutputRestDto | null> {
    const input = PerfilRestMapper.toFindOneInput(params);
    const result = await this.perfilService.findById(accessContext, input);
    return result ? PerfilRestMapper.toFindOneOutputDto(result) : null;
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
    type: PerfilListOutputRestDto,
    description: "Lista de perfis ativos do usuario no campus apos a operacao",
  })
  @ApiForbiddenResponse()
  async setVinculos(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: PerfilSetVinculosInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const input = PerfilRestMapper.toSetVinculosInput(dto);
    const result = await this.perfilService.setVinculos(accessContext, input);
    return PerfilRestMapper.toListOutputDto(result);
  }
}
