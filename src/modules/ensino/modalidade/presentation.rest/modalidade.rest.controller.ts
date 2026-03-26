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
  IModalidadeCreateCommandHandler,
  ModalidadeCreateCommandMetadata,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import {
  IModalidadeDeleteCommandHandler,
  ModalidadeDeleteCommandMetadata,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import {
  IModalidadeUpdateCommandHandler,
  ModalidadeUpdateCommandMetadata,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import {
  IModalidadeFindOneQueryHandler,
  ModalidadeFindOneQueryMetadata,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import {
  IModalidadeListQueryHandler,
  ModalidadeListQueryMetadata,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  ModalidadeCreateInputRestDto,
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  ModalidadeListInputRestDto,
  ModalidadeListOutputRestDto,
  ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";
import * as ModalidadeRestMapper from "./modalidade.rest.mapper";

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
  @ApiOperation(ModalidadeListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: ModalidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: ModalidadeListInputRestDto,
  ): Promise<ModalidadeListOutputRestDto> {
    const query = ModalidadeRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return ModalidadeRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(ModalidadeFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const query = ModalidadeRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Modalidade.entityName, query.id);
    return ModalidadeRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(ModalidadeCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: ModalidadeCreateInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const command = ModalidadeRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return ModalidadeRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(ModalidadeUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
    @Body() dto: ModalidadeUpdateInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const command = ModalidadeRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return ModalidadeRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(ModalidadeDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
  ): Promise<boolean> {
    const query = ModalidadeRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
