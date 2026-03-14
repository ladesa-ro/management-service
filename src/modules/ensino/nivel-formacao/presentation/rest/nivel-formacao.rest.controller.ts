import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { INivelFormacaoCreateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import { INivelFormacaoDeleteCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import { INivelFormacaoUpdateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { INivelFormacaoListQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import {
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  NivelFormacaoListInputRestDto,
  NivelFormacaoListOutputRestDto,
  NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";
import { NivelFormacaoRestMapper } from "./nivel-formacao.rest.mapper";

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
  @ApiOperation({ summary: "Lista niveis de formacao", operationId: "nivelFormacaoFindAll" })
  @ApiOkResponse({ type: NivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: NivelFormacaoListInputRestDto,
  ): Promise<NivelFormacaoListOutputRestDto> {
    const input = NivelFormacaoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
    return NivelFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um nivel de formacao por ID",
    operationId: "nivelFormacaoFindById",
  })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const input = NivelFormacaoRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, NivelFormacao.entityName, input.id);
    return NivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um nivel de formacao", operationId: "nivelFormacaoCreate" })
  @ApiCreatedResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: NivelFormacaoCreateInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const input = NivelFormacaoRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return NivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um nivel de formacao", operationId: "nivelFormacaoUpdate" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
    @Body() dto: NivelFormacaoUpdateInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const findOneInput = NivelFormacaoRestMapper.toFindOneInput(params);
    const updateInput = NivelFormacaoRestMapper.toUpdateInput(dto);
    const result = await this.updateHandler.execute({
      accessContext,
      dto: { ...findOneInput, ...updateInput },
    });
    return NivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um nivel de formacao",
    operationId: "nivelFormacaoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = NivelFormacaoRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
