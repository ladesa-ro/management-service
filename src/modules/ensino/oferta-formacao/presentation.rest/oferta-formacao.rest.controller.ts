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
  IOfertaFormacaoCreateCommandHandler,
  OfertaFormacaoCreateCommandMetadata,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import {
  IOfertaFormacaoDeleteCommandHandler,
  OfertaFormacaoDeleteCommandMetadata,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import {
  IOfertaFormacaoUpdateCommandHandler,
  OfertaFormacaoUpdateCommandMetadata,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import {
  IOfertaFormacaoFindOneQueryHandler,
  OfertaFormacaoFindOneQueryMetadata,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  IOfertaFormacaoListQueryHandler,
  OfertaFormacaoListQueryMetadata,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  OfertaFormacaoCreateInputRestDto,
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  OfertaFormacaoListInputRestDto,
  OfertaFormacaoListOutputRestDto,
  OfertaFormacaoUpdateInputRestDto,
} from "./oferta-formacao.rest.dto";
import * as OfertaFormacaoRestMapper from "./oferta-formacao.rest.mapper";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoRestController {
  constructor(
    @DeclareDependency(IOfertaFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoListQueryHandler,
    @DeclareDependency(IOfertaFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @DeclareDependency(IOfertaFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoCreateCommandHandler,
    @DeclareDependency(IOfertaFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoUpdateCommandHandler,
    @DeclareDependency(IOfertaFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(OfertaFormacaoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: OfertaFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoListOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toListInput.map(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toListOutput(result);
  }

  @Get("/:id")
  @ApiOperation(OfertaFormacaoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toFindOneInput.map(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, OfertaFormacao.entityName, input.id);
    return OfertaFormacaoRestMapper.toFindOneOutput.map(result);
  }

  @Post("/")
  @ApiOperation(OfertaFormacaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: OfertaFormacaoCreateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutput.map(result);
  }

  @Patch("/:id")
  @ApiOperation(OfertaFormacaoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
    @Body() dto: OfertaFormacaoUpdateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toUpdateInput.map({ params, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutput.map(result);
  }

  @Delete("/:id")
  @ApiOperation(OfertaFormacaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoRestMapper.toFindOneInput.map(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
