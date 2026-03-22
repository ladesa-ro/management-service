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
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import {
  CampusCreateInputRestDto,
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  CampusListInputRestDto,
  CampusListOutputRestDto,
  CampusUpdateInputRestDto,
} from "./campus.rest.dto";
import { CampusRestMapper } from "./campus.rest.mapper";

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
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CampusListInputRestDto,
  ): Promise<CampusListOutputRestDto> {
    const input = CampusRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return CampusRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(CampusFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Campus.entityName, input.id);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(CampusCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CampusCreateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(CampusUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
    @Body() dto: CampusUpdateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation(CampusDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CampusRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
