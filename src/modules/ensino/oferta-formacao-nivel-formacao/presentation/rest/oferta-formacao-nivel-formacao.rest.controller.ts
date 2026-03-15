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
import { IOfertaFormacaoNivelFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
import { OfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao";
import { IOfertaFormacaoNivelFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import {
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneOutputRestDto,
  OfertaFormacaoNivelFormacaoListInputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoUpdateInputRestDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";
import { OfertaFormacaoNivelFormacaoRestMapper } from "./oferta-formacao-nivel-formacao.rest.mapper";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista ofertas de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoFindAll",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: OfertaFormacaoNivelFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toListInput(dto);
    const listHandler = this.container.get<IOfertaFormacaoNivelFormacaoListQueryHandler>(
      IOfertaFormacaoNivelFormacaoListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma oferta de formacao nivel formacao por ID",
    operationId: "ofertaFormacaoNivelFormacaoFindById",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toFindOneInput(params);
    const findOneHandler = this.container.get<IOfertaFormacaoNivelFormacaoFindOneQueryHandler>(
      IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, input);
    ensureExists(result, OfertaFormacaoNivelFormacao.entityName, input.id);
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoCreate",
  })
  @ApiCreatedResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: OfertaFormacaoNivelFormacaoCreateInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toCreateInput(dto);
    const createHandler = this.container.get<IOfertaFormacaoNivelFormacaoCreateCommandHandler>(
      IOfertaFormacaoNivelFormacaoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoUpdate",
  })
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
    @Body() dto: OfertaFormacaoNivelFormacaoUpdateInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toUpdateInput(params, dto);
    const updateHandler = this.container.get<IOfertaFormacaoNivelFormacaoUpdateCommandHandler>(
      IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma oferta de formacao nivel formacao",
    operationId: "ofertaFormacaoNivelFormacaoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toFindOneInput(params);
    const deleteHandler = this.container.get<IOfertaFormacaoNivelFormacaoDeleteCommandHandler>(
      IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, input);
  }
}
