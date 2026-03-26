import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  INivelFormacaoCreateCommandHandler,
  NivelFormacaoCreateCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import {
  INivelFormacaoDeleteCommandHandler,
  NivelFormacaoDeleteCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import {
  INivelFormacaoUpdateCommandHandler,
  NivelFormacaoUpdateCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import {
  INivelFormacaoFindOneQueryHandler,
  NivelFormacaoFindOneQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import {
  INivelFormacaoListQueryHandler,
  NivelFormacaoListQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  NivelFormacaoListInputRestDto,
  NivelFormacaoListOutputRestDto,
  NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";
import * as NivelFormacaoRestMapper from "./nivel-formacao.rest.mapper";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoRestController {
  constructor(
    @DeclareDependency(INivelFormacaoListQueryHandler)
    private readonly listHandler: INivelFormacaoListQueryHandler,
    @DeclareDependency(INivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: INivelFormacaoFindOneQueryHandler,
    @DeclareDependency(INivelFormacaoCreateCommandHandler)
    private readonly createHandler: INivelFormacaoCreateCommandHandler,
    @DeclareDependency(INivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: INivelFormacaoUpdateCommandHandler,
    @DeclareDependency(INivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: INivelFormacaoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(NivelFormacaoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: NivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: NivelFormacaoListInputRestDto,
  ): Promise<NivelFormacaoListOutputRestDto> {
    const input = NivelFormacaoRestMapper.toListInput.map(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return NivelFormacaoRestMapper.toListOutput(result);
  }

  @Get("/:id")
  @ApiOperation(NivelFormacaoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const input = NivelFormacaoRestMapper.toFindOneInput.map(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, NivelFormacao.entityName, input.id);
    return NivelFormacaoRestMapper.toFindOneOutput.map(result);
  }

  @Post("/")
  @ApiOperation(NivelFormacaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: NivelFormacaoCreateInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const input = NivelFormacaoRestMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return NivelFormacaoRestMapper.toFindOneOutput.map(result);
  }

  @Patch("/:id")
  @ApiOperation(NivelFormacaoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
    @Body() dto: NivelFormacaoUpdateInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const input = NivelFormacaoRestMapper.toUpdateInput.map({ params, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return NivelFormacaoRestMapper.toFindOneOutput.map(result);
  }

  @Delete("/:id")
  @ApiOperation(NivelFormacaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = NivelFormacaoRestMapper.toFindOneInput.map(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
