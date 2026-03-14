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
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusCreateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { ICampusDeleteCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import { ICampusUpdateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista campi", operationId: "campusFindAll" })
  @ApiOkResponse({ type: CampusListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CampusListInputRestDto,
  ): Promise<CampusListOutputRestDto> {
    const input = CampusRestMapper.toListInput(dto);
    const listHandler = this.container.get<ICampusListQueryHandler>(ICampusListQueryHandler);
    const result = await listHandler.execute({ accessContext, dto: input });
    return CampusRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um campus por ID", operationId: "campusFindById" })
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toFindOneInput(params);
    const findOneHandler = this.container.get<ICampusFindOneQueryHandler>(
      ICampusFindOneQueryHandler,
    );
    const result = await findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, Campus.entityName, input.id);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um campus", operationId: "campusCreate" })
  @ApiCreatedResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CampusCreateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toCreateInput(dto);
    const createHandler = this.container.get<ICampusCreateCommandHandler>(
      ICampusCreateCommandHandler,
    );
    const result = await createHandler.execute({ accessContext, dto: input });
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um campus", operationId: "campusUpdate" })
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
    @Body() dto: CampusUpdateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toUpdateInput(params, dto);
    const updateHandler = this.container.get<ICampusUpdateCommandHandler>(
      ICampusUpdateCommandHandler,
    );
    const result = await updateHandler.execute({ accessContext, dto: input });
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um campus", operationId: "campusDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CampusRestMapper.toFindOneInput(params);
    const deleteHandler = this.container.get<ICampusDeleteCommandHandler>(
      ICampusDeleteCommandHandler,
    );
    return deleteHandler.execute({ accessContext, dto: input });
  }
}
