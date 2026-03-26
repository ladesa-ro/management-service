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
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import {
  CampusCreateCommandMetadata,
  ICampusCreateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import {
  CampusDeleteCommandMetadata,
  ICampusDeleteCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import {
  CampusUpdateCommandMetadata,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import {
  CampusFindOneQueryMetadata,
  ICampusFindOneQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  CampusListQueryMetadata,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CampusCreateInputRestDto,
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  CampusListInputRestDto,
  CampusListOutputRestDto,
  CampusUpdateInputRestDto,
} from "./campus.rest.dto";
import * as CampusRestMapper from "./campus.rest.mapper";

@ApiTags("campi")
@Controller("/campi")
export class CampusRestController {
  constructor(
    @DeclareDependency(ICampusListQueryHandler)
    private readonly listHandler: ICampusListQueryHandler,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly findOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(ICampusCreateCommandHandler)
    private readonly createHandler: ICampusCreateCommandHandler,
    @DeclareDependency(ICampusUpdateCommandHandler)
    private readonly updateHandler: ICampusUpdateCommandHandler,
    @DeclareDependency(ICampusDeleteCommandHandler)
    private readonly deleteHandler: ICampusDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CampusListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CampusListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CampusListInputRestDto,
  ): Promise<CampusListOutputRestDto> {
    const query = CampusRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CampusRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(CampusFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const query = CampusRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Campus.entityName, query.id);
    return CampusRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(CampusCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CampusCreateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const command = CampusRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CampusRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(CampusUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CampusFindOneInputRestDto,
    @Body() dto: CampusUpdateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const command = CampusRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CampusRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(CampusDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<boolean> {
    const query = CampusRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
