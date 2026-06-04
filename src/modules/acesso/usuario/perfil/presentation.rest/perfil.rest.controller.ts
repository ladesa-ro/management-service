import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
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
import { PerfilVinculosFiltroQuery } from "../domain/queries/perfil-vinculos-filtro.query";
import {
  IPerfilVinculosFiltroQueryHandler,
  PerfilVinculosFiltroQueryMetadata,
} from "../domain/queries/perfil-vinculos-filtro.query.handler.interface";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
  PerfilListInputRestDto,
  PerfilListOutputRestDto,
  PerfilVinculosFiltroInputRestDto,
} from "./perfil.rest.dto";
import * as PerfilRestMapper from "./perfil.rest.mapper";

@ApiTags("perfis")
@Controller("/perfis")
export class PerfilListRestController {
  constructor(
    @Dep(IPerfilListQueryHandler)
    private readonly listHandler: IPerfilListQueryHandler,
    @Dep(IPerfilFindOneQueryHandler)
    private readonly findOneHandler: IPerfilFindOneQueryHandler,
    @Dep(IPerfilVinculosFiltroQueryHandler)
    private readonly vinculosFiltroHandler: IPerfilVinculosFiltroQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation(PerfilListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: PerfilListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: PerfilListInputRestDto,
  ): Promise<PerfilListOutputRestDto> {
    const query = PerfilRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return PerfilRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/vinculos")
  @ApiOperation(PerfilVinculosFiltroQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: [PerfilFindOneOutputRestDto] })
  @ApiForbiddenResponse()
  async findVinculos(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: PerfilVinculosFiltroInputRestDto,
  ): Promise<PerfilFindOneOutputRestDto[]> {
    const query = new PerfilVinculosFiltroQuery();
    query.campusId = dto.campusId;
    query.cargoNome = dto.cargoNome;
    query.cursoId = dto.cursoId;

    const queryResult = await this.vinculosFiltroHandler.execute(accessContext, query);
    return queryResult.map((result) => PerfilRestMapper.findOneQueryResultToOutputDto.map(result));
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
    const query = PerfilRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    return queryResult ? PerfilRestMapper.findOneQueryResultToOutputDto.map(queryResult) : null;
  }
}

@ApiTags("usuarios")
@Controller("/usuarios/:usuarioId/perfis")
export class PerfilRestController {
  constructor(
    @Dep(IPerfilFindOneQueryHandler)
    private readonly findOneHandler: IPerfilFindOneQueryHandler,
  ) {}

  @Get("/:id")
  @ApiOperation(PerfilFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: PerfilFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: PerfilFindOneInputRestDto,
  ): Promise<PerfilFindOneOutputRestDto | null> {
    const query = PerfilRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    return queryResult ? PerfilRestMapper.findOneQueryResultToOutputDto.map(queryResult) : null;
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
    const query = PerfilRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    return queryResult ? PerfilRestMapper.findOneQueryResultToOutputDto.map(queryResult) : null;
  }
}
