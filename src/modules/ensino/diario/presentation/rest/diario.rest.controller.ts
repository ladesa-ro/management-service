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
import { IDiarioCreateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import { IDiarioDeleteCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { IDiarioUpdateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import { IDiarioListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import {
  DiarioCreateInputRestDto,
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
  DiarioListInputRestDto,
  DiarioListOutputRestDto,
  DiarioUpdateInputRestDto,
} from "./diario.rest.dto";
import { DiarioRestMapper } from "./diario.rest.mapper";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioRestController {
  constructor(
    @DeclareDependency(IDiarioListQueryHandler)
    private readonly listHandler: IDiarioListQueryHandler,
    @DeclareDependency(IDiarioFindOneQueryHandler)
    private readonly findOneHandler: IDiarioFindOneQueryHandler,
    @DeclareDependency(IDiarioCreateCommandHandler)
    private readonly createHandler: IDiarioCreateCommandHandler,
    @DeclareDependency(IDiarioUpdateCommandHandler)
    private readonly updateHandler: IDiarioUpdateCommandHandler,
    @DeclareDependency(IDiarioDeleteCommandHandler)
    private readonly deleteHandler: IDiarioDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios", operationId: "diarioFindAll" })
  @ApiOkResponse({ type: DiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioListInputRestDto,
  ): Promise<DiarioListOutputRestDto> {
    const input = DiarioRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
    return DiarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario por ID", operationId: "diarioFindById" })
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, Diario.entityName, input.id);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario", operationId: "diarioCreate" })
  @ApiCreatedResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioCreateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario", operationId: "diarioUpdate" })
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputRestDto,
    @Body() dto: DiarioUpdateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario", operationId: "diarioDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DiarioRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
