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
import { IModalidadeCreateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { IModalidadeDeleteCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import { IModalidadeUpdateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import { IModalidadeListQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import {
  ModalidadeCreateInputRestDto,
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  ModalidadeListInputRestDto,
  ModalidadeListOutputRestDto,
  ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";
import { ModalidadeRestMapper } from "./modalidade.rest.mapper";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeRestController {
  constructor(
    @DeclareDependency(IModalidadeListQueryHandler)
    private readonly listHandler: IModalidadeListQueryHandler,
    @DeclareDependency(IModalidadeFindOneQueryHandler)
    private readonly findOneHandler: IModalidadeFindOneQueryHandler,
    @DeclareDependency(IModalidadeCreateCommandHandler)
    private readonly createHandler: IModalidadeCreateCommandHandler,
    @DeclareDependency(IModalidadeUpdateCommandHandler)
    private readonly updateHandler: IModalidadeUpdateCommandHandler,
    @DeclareDependency(IModalidadeDeleteCommandHandler)
    private readonly deleteHandler: IModalidadeDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista modalidades", operationId: "modalidadeFindAll" })
  @ApiOkResponse({ type: ModalidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ModalidadeListInputRestDto,
  ): Promise<ModalidadeListOutputRestDto> {
    const input = ModalidadeRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return ModalidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma modalidade por ID", operationId: "modalidadeFindById" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const input = ModalidadeRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Modalidade.entityName, input.id);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma modalidade", operationId: "modalidadeCreate" })
  @ApiCreatedResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ModalidadeCreateInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const input = ModalidadeRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma modalidade", operationId: "modalidadeUpdate" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
    @Body() dto: ModalidadeUpdateInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const input = ModalidadeRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma modalidade", operationId: "modalidadeDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
  ): Promise<boolean> {
    const input = ModalidadeRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
