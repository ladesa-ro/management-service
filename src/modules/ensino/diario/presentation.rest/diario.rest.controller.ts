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
  DiarioCreateCommandMetadata,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import {
  DiarioDeleteCommandMetadata,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import {
  DiarioUpdateCommandMetadata,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import {
  DiarioFindOneQueryMetadata,
  IDiarioFindOneQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  DiarioListQueryMetadata,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import { AccessContextHttp } from "@/server/access-context";
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
  @ApiOperation(DiarioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: DiarioListInputRestDto,
  ): Promise<DiarioListOutputRestDto> {
    const input = DiarioRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return DiarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(DiarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Diario.entityName, input.id);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(DiarioCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: DiarioCreateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(DiarioUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
    @Body() dto: DiarioUpdateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation(DiarioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DiarioRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
