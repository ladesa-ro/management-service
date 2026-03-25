import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  IPerfilSetVinculosCommandHandler,
  PerfilSetVinculosCommandMetadata,
} from "@/modules/acesso/usuario/perfil/domain/commands/perfil-set-vinculos.command.handler.interface";
import { PerfilEnsinoByIdQueryMetadata } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-ensino-by-id.query.metadata";
import {
  IPerfilFindOneQueryHandler,
  PerfilFindOneQueryMetadata,
} from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.handler.interface";
import {
  IPerfilListQueryHandler,
  PerfilListQueryMetadata,
} from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
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
  @ApiOperation(PerfilListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: PerfilListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: PerfilParentParamsRestDto,
    @Query() dto: PerfilListInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const input = PerfilRestMapper.toListInput(dto)!;
    input["filter.usuario.id"] = [parentParams.usuarioId];
    const result = await this.listHandler.execute(accessContext, input);
    return PerfilRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(PerfilFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: PerfilFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: PerfilFindOneInputRestDto,
  ): Promise<PerfilFindOneOutputRestDto | null> {
    const input = PerfilRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    return result ? PerfilRestMapper.toFindOneOutputDto(result) : null;
  }

  @Get("/:id/ensino")
  @ApiOperation(PerfilEnsinoByIdQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: PerfilFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: PerfilFindOneInputRestDto,
  ): Promise<PerfilFindOneOutputRestDto | null> {
    const input = PerfilRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    return result ? PerfilRestMapper.toFindOneOutputDto(result) : null;
  }

  @Post("/")
  @ApiOperation(PerfilSetVinculosCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({
    type: PerfilListOutputRestDto,
    description: "Lista de perfis ativos do usuario no campus apos a operacao",
  })
  @ApiForbiddenResponse()
  async setVinculos(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: PerfilParentParamsRestDto,
    @Body() dto: PerfilSetVinculosInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const input = PerfilRestMapper.toSetVinculosInput(dto);
    input.usuario = { id: parentParams.usuarioId };
    const result = await this.setVinculosHandler.execute(accessContext, input);
    return PerfilRestMapper.toListOutputDto(result);
  }
}
