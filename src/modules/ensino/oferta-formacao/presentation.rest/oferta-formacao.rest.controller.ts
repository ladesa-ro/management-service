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
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import {
  OfertaFormacaoCreateInputRestDto,
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  OfertaFormacaoListInputRestDto,
  OfertaFormacaoListOutputRestDto,
  OfertaFormacaoUpdateInputRestDto,
} from "./oferta-formacao.rest.dto";
import { OfertaFormacaoRestMapper } from "./oferta-formacao.rest.mapper";

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
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoListOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(OfertaFormacaoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, OfertaFormacao.entityName, input.id);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(OfertaFormacaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoCreateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(OfertaFormacaoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
    @Body() dto: OfertaFormacaoUpdateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation(OfertaFormacaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
