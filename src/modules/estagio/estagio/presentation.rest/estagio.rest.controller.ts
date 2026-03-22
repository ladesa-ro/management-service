import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import {
  EstagioCreateCommandMetadata,
  IEstagioCreateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import {
  EstagioDeleteCommandMetadata,
  IEstagioDeleteCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import {
  EstagioUpdateCommandMetadata,
  IEstagioUpdateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import {
  EstagioFindOneQueryMetadata,
  IEstagioFindOneQueryHandler,
} from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.handler.interface";
import {
  EstagioListQueryMetadata,
  IEstagioListQueryHandler,
} from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import { AccessContextHttp } from "@/server/access-context";
import {
  EstagioCreateInputRestDto,
  EstagioFindOneInputRestDto,
  EstagioFindOneOutputRestDto,
  EstagioListInputRestDto,
  EstagioListOutputRestDto,
  EstagioUpdateInputRestDto,
} from "./estagio.rest.dto";
import { EstagioRestMapper } from "./estagio.rest.mapper";

@ApiTags("estagios")
@Controller("/estagios")
export class EstagioRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation(EstagioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EstagioListInputRestDto,
  ): Promise<EstagioListOutputRestDto> {
    const listHandler = this.container.get<IEstagioListQueryHandler>(IEstagioListQueryHandler);
    const input = EstagioRestMapper.toListInput(dto);
    const result = await listHandler.execute(accessContext, input);
    return EstagioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(EstagioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    const findOneHandler = this.container.get<IEstagioFindOneQueryHandler>(
      IEstagioFindOneQueryHandler,
    );
    const input = EstagioRestMapper.toFindOneInput(params);
    const result = await findOneHandler.execute(accessContext, input);
    ensureExists(result, Estagio.entityName, input.id);
    return EstagioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(EstagioCreateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: EstagioCreateInputRestDto })
  @ApiCreatedResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagioCreateInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    const createHandler = this.container.get<IEstagioCreateCommandHandler>(
      IEstagioCreateCommandHandler,
    );
    const input = EstagioRestMapper.toCreateInput(dto);
    const result = await createHandler.execute(accessContext, input);
    return EstagioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(EstagioUpdateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: EstagioUpdateInputRestDto })
  @ApiOkResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioFindOneInputRestDto,
    @Body() dto: EstagioUpdateInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    const updateHandler = this.container.get<IEstagioUpdateCommandHandler>(
      IEstagioUpdateCommandHandler,
    );
    const input = EstagioRestMapper.toUpdateInput(dto);
    const result = await updateHandler.execute(accessContext, { id: params.id, ...input });
    return EstagioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation(EstagioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ description: "Estágio deletado com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<{ message: string }> {
    const deleteHandler = this.container.get<IEstagioDeleteCommandHandler>(
      IEstagioDeleteCommandHandler,
    );
    await deleteHandler.execute(accessContext, { id: params.id });
    return { message: "Estágio deletado com sucesso" };
  }
}
