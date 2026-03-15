import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IOfertaFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { IOfertaFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import { IOfertaFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ofertas de formacao", operationId: "ofertaFormacaoFindAll" })
  @ApiOkResponse({ type: OfertaFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoListOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toListInput(dto);
    const listHandler = this.container.get<IOfertaFormacaoListQueryHandler>(
      IOfertaFormacaoListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma oferta de formacao por ID",
    operationId: "ofertaFormacaoFindById",
  })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    const findOneHandler = this.container.get<IOfertaFormacaoFindOneQueryHandler>(
      IOfertaFormacaoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, input);
    ensureExists(result, OfertaFormacao.entityName, input.id);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma oferta de formacao", operationId: "ofertaFormacaoCreate" })
  @ApiCreatedResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoCreateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toCreateInput(dto);
    const createHandler = this.container.get<IOfertaFormacaoCreateCommandHandler>(
      IOfertaFormacaoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma oferta de formacao", operationId: "ofertaFormacaoUpdate" })
  @ApiOkResponse({ type: OfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
    @Body() dto: OfertaFormacaoUpdateInputRestDto,
  ): Promise<OfertaFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoRestMapper.toUpdateInput(params, dto);
    const updateHandler = this.container.get<IOfertaFormacaoUpdateCommandHandler>(
      IOfertaFormacaoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return OfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma oferta de formacao",
    operationId: "ofertaFormacaoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoRestMapper.toFindOneInput(params);
    const deleteHandler = this.container.get<IOfertaFormacaoDeleteCommandHandler>(
      IOfertaFormacaoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, input);
  }
}
