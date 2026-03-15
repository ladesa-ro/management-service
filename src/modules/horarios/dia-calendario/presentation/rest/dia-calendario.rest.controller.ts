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
import { IDiaCalendarioCreateCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-create.command.handler.interface";
import { IDiaCalendarioDeleteCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-delete.command.handler.interface";
import { IDiaCalendarioUpdateCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-update.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario";
import { IDiaCalendarioFindOneQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-find-one.query.handler.interface";
import { IDiaCalendarioListQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import {
  DiaCalendarioCreateInputRestDto,
  DiaCalendarioFindOneInputRestDto,
  DiaCalendarioFindOneOutputRestDto,
  DiaCalendarioListInputRestDto,
  DiaCalendarioListOutputRestDto,
  DiaCalendarioUpdateInputRestDto,
} from "./dia-calendario.rest.dto";
import { DiaCalendarioRestMapper } from "./dia-calendario.rest.mapper";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista dias de calendario", operationId: "diaCalendarioFindAll" })
  @ApiOkResponse({ type: DiaCalendarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiaCalendarioListInputRestDto,
  ): Promise<DiaCalendarioListOutputRestDto> {
    const listHandler = this.container.get<IDiaCalendarioListQueryHandler>(
      IDiaCalendarioListQueryHandler,
    );
    const input = DiaCalendarioRestMapper.toListInput(dto);
    const result = await listHandler.execute(accessContext, input as any);
    return DiaCalendarioRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um dia de calendario por ID",
    operationId: "diaCalendarioFindById",
  })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputRestDto,
  ): Promise<DiaCalendarioFindOneOutputRestDto> {
    const findOneHandler = this.container.get<IDiaCalendarioFindOneQueryHandler>(
      IDiaCalendarioFindOneQueryHandler,
    );
    const input = DiaCalendarioRestMapper.toFindOneInput(params);
    const result = await findOneHandler.execute(accessContext, input as any);
    ensureExists(result, DiaCalendario.entityName, (input as any).id);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um dia de calendario", operationId: "diaCalendarioCreate" })
  @ApiCreatedResponse({ type: DiaCalendarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiaCalendarioCreateInputRestDto,
  ): Promise<DiaCalendarioFindOneOutputRestDto> {
    const createHandler = this.container.get<IDiaCalendarioCreateCommandHandler>(
      IDiaCalendarioCreateCommandHandler,
    );
    const input = DiaCalendarioRestMapper.toCreateInput(dto);
    const result = await createHandler.execute(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um dia de calendario", operationId: "diaCalendarioUpdate" })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputRestDto,
    @Body() dto: DiaCalendarioUpdateInputRestDto,
  ): Promise<DiaCalendarioFindOneOutputRestDto> {
    const updateHandler = this.container.get<IDiaCalendarioUpdateCommandHandler>(
      IDiaCalendarioUpdateCommandHandler,
    );
    const input = DiaCalendarioRestMapper.toUpdateInput(params, dto);
    const result = await updateHandler.execute(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um dia de calendario",
    operationId: "diaCalendarioDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputRestDto,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IDiaCalendarioDeleteCommandHandler>(
      IDiaCalendarioDeleteCommandHandler,
    );
    const input = DiaCalendarioRestMapper.toFindOneInput(params);
    return deleteHandler.execute(accessContext, input as any);
  }
}
