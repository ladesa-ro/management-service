import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IOfertaFormacaoNivelFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import { IOfertaFormacaoNivelFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
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
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoNivelFormacaoListQueryHandler,
    @Inject(IOfertaFormacaoNivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
    @Inject(IOfertaFormacaoNivelFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoNivelFormacaoCreateCommandHandler,
    @Inject(IOfertaFormacaoNivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
    @Inject(IOfertaFormacaoNivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
  ) {}

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
    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, "OfertaFormacaoNivelFormacao", input.id);
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
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
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
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
