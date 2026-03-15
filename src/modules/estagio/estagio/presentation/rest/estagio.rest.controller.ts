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
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IEstagioCreateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import { IEstagioDeleteCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import { IEstagioUpdateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import { IEstagioFindOneQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.handler.interface";
import { IEstagioListQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import {
  EstagioCreateInputRestDto,
  EstagioFindOneInputRestDto,
  EstagioFindOneOutputRestDto,
  EstagioHorarioInputRestDto,
  EstagioHorarioListOutputRestDto,
  EstagioHorarioParamRestDto,
  EstagioListInputRestDto,
  EstagioListOutputRestDto,
  HorarioEstagioOutputRestDto,
  EstagioUpdateInputRestDto,
} from "./estagio.rest.dto";
import { EstagioRestMapper } from "./estagio.rest.mapper";

@ApiTags("estagios")
@Controller("/estagios")
export class EstagioRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  private async loadEstagioOrThrow(
    accessContext: AccessContext,
    id: string,
  ): Promise<EstagioFindOneOutputRestDto> {
    const findOneHandler = this.container.get<IEstagioFindOneQueryHandler>(
      IEstagioFindOneQueryHandler,
    );
    const estagio = await findOneHandler.execute(accessContext, { id });
    ensureExists(estagio, Estagio.entityName, id);
    return EstagioRestMapper.toFindOneOutputDto(estagio);
  }

  @Get("/")
  @ApiOperation({ summary: "Lista estágios", operationId: "estagioFindAll" })
  @ApiOkResponse({ type: EstagioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstagioListInputRestDto,
  ): Promise<EstagioListOutputRestDto> {
    const listHandler = this.container.get<IEstagioListQueryHandler>(IEstagioListQueryHandler);
    const input = EstagioRestMapper.toListInput(dto);
    const result = await listHandler.execute(accessContext, input);
    return EstagioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um estágio por ID", operationId: "estagioFindById" })
  @ApiOkResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    return this.loadEstagioOrThrow(accessContext, params.id);
  }

  @Get("/:id/horarios")
  @ApiOperation({ summary: "Lista horários do estágio", operationId: "estagioHorarioFindAll" })
  @ApiOkResponse({ type: EstagioHorarioListOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findAllHorarios(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<EstagioHorarioListOutputRestDto> {
    const estagio = await this.loadEstagioOrThrow(accessContext, params.id);
    return { data: estagio.horariosEstagio };
  }

  @Post("/:id/horarios")
  @ApiOperation({ summary: "Adiciona horário ao estágio", operationId: "estagioHorarioCreate" })
  @ApiBody({ type: EstagioHorarioInputRestDto })
  @ApiCreatedResponse({ type: HorarioEstagioOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async createHorario(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagioFindOneInputRestDto,
    @Body() dto: EstagioHorarioInputRestDto,
  ): Promise<HorarioEstagioOutputRestDto> {
    const updateHandler = this.container.get<IEstagioUpdateCommandHandler>(
      IEstagioUpdateCommandHandler,
    );
    const estagio = await this.loadEstagioOrThrow(accessContext, params.id);
    const beforeIds = new Set(estagio.horariosEstagio.map((item) => item.id));

    const result = await updateHandler.execute(accessContext, {
      id: params.id,
      horariosEstagio: [...estagio.horariosEstagio, dto],
    });

    const created =
      result.horariosEstagio.find((item) => !beforeIds.has(item.id)) ??
      result.horariosEstagio[result.horariosEstagio.length - 1];

    ensureExists(created, "HorarioEstagio");

    return created;
  }

  @Patch("/:id/horarios/:horarioId")
  @ApiOperation({ summary: "Atualiza horário do estágio", operationId: "estagioHorarioUpdate" })
  @ApiBody({ type: EstagioHorarioInputRestDto })
  @ApiOkResponse({ type: HorarioEstagioOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async updateHorario(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagioHorarioParamRestDto,
    @Body() dto: EstagioHorarioInputRestDto,
  ): Promise<HorarioEstagioOutputRestDto> {
    const updateHandler = this.container.get<IEstagioUpdateCommandHandler>(
      IEstagioUpdateCommandHandler,
    );
    const estagio = await this.loadEstagioOrThrow(accessContext, params.id);

    const exists = estagio.horariosEstagio.some((item) => item.id === params.horarioId);
    ensureExists(exists ? true : null, "HorarioEstagio", params.horarioId);

    const horariosEstagio = estagio.horariosEstagio.map((item) => {
      if (item.id !== params.horarioId) return item;
      return {
        id: item.id,
        diaSemana: dto.diaSemana,
        horaInicio: dto.horaInicio,
        horaFim: dto.horaFim,
      };
    });

    const result = await updateHandler.execute(accessContext, {
      id: params.id,
      horariosEstagio,
    });

    const updated = result.horariosEstagio.find((item) => item.id === params.horarioId);
    ensureExists(updated, "HorarioEstagio", params.horarioId);

    return updated;
  }

  @Delete("/:id/horarios/:horarioId")
  @ApiOperation({ summary: "Remove horário do estágio", operationId: "estagioHorarioDelete" })
  @ApiOkResponse({ description: "Horário removido com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteHorario(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagioHorarioParamRestDto,
  ): Promise<{ message: string }> {
    const updateHandler = this.container.get<IEstagioUpdateCommandHandler>(
      IEstagioUpdateCommandHandler,
    );
    const estagio = await this.loadEstagioOrThrow(accessContext, params.id);
    const horariosEstagio = estagio.horariosEstagio.filter((item) => item.id !== params.horarioId);

    ensureExists(
      horariosEstagio.length !== estagio.horariosEstagio.length ? true : null,
      "HorarioEstagio",
      params.horarioId,
    );

    await updateHandler.execute(accessContext, {
      id: params.id,
      horariosEstagio,
    });

    return { message: "Horário removido com sucesso" };
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um estágio", operationId: "estagioCreate" })
  @ApiBody({ type: EstagioCreateInputRestDto })
  @ApiCreatedResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
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
  @ApiOperation({ summary: "Atualiza um estágio", operationId: "estagioUpdate" })
  @ApiBody({ type: EstagioUpdateInputRestDto })
  @ApiOkResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
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
  @ApiOperation({ summary: "Deleta um estágio", operationId: "estagioDelete" })
  @ApiOkResponse({ description: "Estágio deletado com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<{ message: string }> {
    const deleteHandler = this.container.get<IEstagioDeleteCommandHandler>(
      IEstagioDeleteCommandHandler,
    );
    await deleteHandler.execute(accessContext, { id: params.id });
    return { message: "Estágio deletado com sucesso" };
  }
}
