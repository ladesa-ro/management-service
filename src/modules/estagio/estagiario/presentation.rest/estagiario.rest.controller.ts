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
  EstagiarioCreateCommandMetadata,
  IEstagiarioCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import {
  EstagiarioDeleteCommandMetadata,
  IEstagiarioDeleteCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import {
  EstagiarioUpdateCommandMetadata,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import {
  EstagiarioFindOneQueryMetadata,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import {
  EstagiarioListQueryMetadata,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";
import * as EstagiarioRestMapper from "./estagiario.rest.mapper";

@ApiTags("estagiarios")
@Controller("/estagiarios")
export class EstagiarioRestController {
  constructor(
    @DeclareDependency(IEstagiarioListQueryHandler)
    private readonly listHandler: IEstagiarioListQueryHandler,
    @DeclareDependency(IEstagiarioFindOneQueryHandler)
    private readonly findOneHandler: IEstagiarioFindOneQueryHandler,
    @DeclareDependency(IEstagiarioCreateCommandHandler)
    private readonly createHandler: IEstagiarioCreateCommandHandler,
    @DeclareDependency(IEstagiarioUpdateCommandHandler)
    private readonly updateHandler: IEstagiarioUpdateCommandHandler,
    @DeclareDependency(IEstagiarioDeleteCommandHandler)
    private readonly deleteHandler: IEstagiarioDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(EstagiarioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EstagiarioListInputRestDto,
  ): Promise<EstagiarioListOutputRestDto> {
    const input = EstagiarioRestMapper.toListInput.map(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return EstagiarioRestMapper.toListOutput(result);
  }

  @Get("/:id")
  @ApiOperation(EstagiarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toFindOneInput.map(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Estagiario.entityName, input.id);
    return EstagiarioRestMapper.toFindOneOutput.map(result);
  }

  @Post("/")
  @ApiOperation(EstagiarioCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagiarioCreateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return EstagiarioRestMapper.toFindOneOutput.map(result);
  }

  @Patch("/:id")
  @ApiOperation(EstagiarioUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
    @Body() dto: EstagiarioUpdateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toUpdateInput.map({ params, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return EstagiarioRestMapper.toFindOneOutput.map(result);
  }

  @Delete("/:id")
  @ApiOperation(EstagiarioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = EstagiarioRestMapper.toFindOneInput.map(params);
    await this.deleteHandler.execute(accessContext, input);
    return true;
  }
}
