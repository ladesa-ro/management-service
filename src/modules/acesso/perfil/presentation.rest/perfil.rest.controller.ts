import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { IPerfilSetVinculosCommandHandler } from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command.handler.interface";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IPerfilListQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
  PerfilListInputRestDto,
  PerfilListOutputRestDto,
  PerfilParentParamsRestDto,
  PerfilSetVinculosInputRestDto,
} from "./perfil.rest.dto";
import { PerfilRestMapper } from "./perfil.rest.mapper";

@ApiTags("usuarios")
@Controller("/usuarios/:usuarioId/perfis")
export class PerfilRestController {
  constructor(
    @DeclareDependency(IPerfilListQueryHandler)
    private readonly listHandler: IPerfilListQueryHandler,
    @DeclareDependency(IPerfilFindOneQueryHandler)
    private readonly findOneHandler: IPerfilFindOneQueryHandler,
    @DeclareDependency(IPerfilSetVinculosCommandHandler)
    private readonly setVinculosHandler: IPerfilSetVinculosCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista perfis de um usuario", operationId: "perfilFindAll" })
  @ApiOkResponse({ type: PerfilListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() parentParams: PerfilParentParamsRestDto,
    @Query() dto: PerfilListInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const input = PerfilRestMapper.toListInput(dto)!;
    input["filter.usuario.id"] = [parentParams.usuarioId];
    const result = await this.listHandler.execute(accessContext, input);
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
    const result = await this.findOneHandler.execute(accessContext, input);
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
    const result = await this.findOneHandler.execute(accessContext, input);
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
    @Param() parentParams: PerfilParentParamsRestDto,
    @Body() dto: PerfilSetVinculosInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const input = PerfilRestMapper.toSetVinculosInput(dto);
    input.usuario = { id: parentParams.usuarioId };
    const result = await this.setVinculosHandler.execute(accessContext, input);
    return PerfilRestMapper.toListOutputDto(result);
  }
}
