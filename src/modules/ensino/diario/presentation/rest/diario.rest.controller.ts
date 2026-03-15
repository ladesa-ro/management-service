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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios", operationId: "diarioFindAll" })
  @ApiOkResponse({ type: DiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioListInputRestDto,
  ): Promise<DiarioListOutputRestDto> {
    const input = DiarioRestMapper.toListInput(dto);
    const listHandler = this.container.get<IDiarioListQueryHandler>(IDiarioListQueryHandler);
    const result = await listHandler.execute(accessContext, input);
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
    const findOneHandler = this.container.get<IDiarioFindOneQueryHandler>(
      IDiarioFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, input);
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
    const createHandler = this.container.get<IDiarioCreateCommandHandler>(
      IDiarioCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
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
    const updateHandler = this.container.get<IDiarioUpdateCommandHandler>(
      IDiarioUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
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
    const deleteHandler = this.container.get<IDiarioDeleteCommandHandler>(
      IDiarioDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, input);
  }
}
