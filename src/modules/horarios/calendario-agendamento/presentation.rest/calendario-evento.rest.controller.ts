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
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { AccessContextHttp } from "@/server/nest/access-context";
import type { ICalendarioAgendamentoRepository } from "../domain/repositories/calendario-agendamento.repository.interface";
import { ICalendarioAgendamentoRepository as ICalendarioAgendamentoRepositoryToken } from "../domain/repositories/calendario-agendamento.repository.interface";
import type { ICalendarioAgendamentoJunctionRepository } from "../domain/repositories/calendario-agendamento-junction.repository.interface";
import { ICalendarioAgendamentoJunctionRepository as ICalendarioAgendamentoJunctionRepositoryToken } from "../domain/repositories/calendario-agendamento-junction.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import {
  CalendarioEventoCreateInputRestDto,
  CalendarioEventoFindOneOutputRestDto,
  CalendarioEventoFindOneParamsRestDto,
  CalendarioEventoListOutputRestDto,
  CalendarioEventoUpdateInputRestDto,
} from "./calendario-evento.rest.dto";

@ApiTags("calendario")
@Controller("/calendario/eventos")
export class CalendarioEventoRestController {
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepositoryToken)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
    @DeclareDependency(ICalendarioAgendamentoJunctionRepositoryToken)
    private readonly calendarioAgendamentoJunctionRepository: ICalendarioAgendamentoJunctionRepository,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista eventos do calendario", operationId: "calendarioEventoFindAll" })
  @ApiOkResponse({ type: CalendarioEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Query("search") search?: string,
    @Query("filter.turma.id") filterTurmaId?: string,
    @Query("filter.ofertaFormacao.id") filterOfertaFormacaoId?: string,
    @Query("filter.periodo") filterPeriodo?: string,
  ): Promise<CalendarioEventoListOutputRestDto> {
    const entities = await this.calendarioAgendamentoRepository.findEventos({
      search,
      filterTurmaId,
      filterOfertaFormacaoId,
    });

    const data = await Promise.all(entities.map((e) => this.toOutputDtoWithRelations(e)));

    return { data };
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um evento por ID", operationId: "calendarioEventoFindById" })
  @ApiOkResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const entity = await this.calendarioAgendamentoRepository.findById(
      params.id,
      CalendarioAgendamentoTipo.EVENTO,
    );
    ensureExists(entity, "CalendarioEvento", params.id);
    return this.toOutputDtoWithRelations(entity);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um evento no calendario", operationId: "calendarioEventoCreate" })
  @ApiCreatedResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Body() dto: CalendarioEventoCreateInputRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const entity = new CalendarioAgendamentoEntity();
    entity.id = generateUuidV7();
    entity.tipo = CalendarioAgendamentoTipo.EVENTO;
    entity.nome = dto.nome;
    entity.dataInicio = new Date(dto.dataInicio);
    entity.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    entity.diaInteiro = dto.diaInteiro;
    entity.horarioInicio = dto.horarioInicio ?? "00:00:00";
    entity.horarioFim = dto.horarioFim ?? "23:59:59";
    entity.cor = dto.cor ?? null;
    entity.repeticao = dto.repeticao ?? null;
    entity.status = CalendarioAgendamentoStatus.ATIVO;

    await this.calendarioAgendamentoRepository.save(entity);
    await this.calendarioAgendamentoJunctionRepository.syncJunctions(entity.id, dto);

    return this.toOutputDtoWithRelations(entity);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um evento", operationId: "calendarioEventoUpdate" })
  @ApiOkResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
    @Body() dto: CalendarioEventoUpdateInputRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const entity = await this.calendarioAgendamentoRepository.findById(
      params.id,
      CalendarioAgendamentoTipo.EVENTO,
    );
    ensureExists(entity, "CalendarioEvento", params.id);

    if (dto.nome !== undefined) entity.nome = dto.nome;
    if (dto.dataInicio !== undefined) entity.dataInicio = new Date(dto.dataInicio);
    if (dto.dataFim !== undefined) entity.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    if (dto.diaInteiro !== undefined) entity.diaInteiro = dto.diaInteiro;
    if (dto.horarioInicio !== undefined) entity.horarioInicio = dto.horarioInicio;
    if (dto.horarioFim !== undefined) entity.horarioFim = dto.horarioFim;
    if (dto.cor !== undefined) entity.cor = dto.cor ?? null;
    if (dto.repeticao !== undefined) entity.repeticao = dto.repeticao ?? null;

    await this.calendarioAgendamentoRepository.save(entity);
    await this.calendarioAgendamentoJunctionRepository.syncJunctions(entity.id, dto);

    return this.toOutputDtoWithRelations(entity);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um evento", operationId: "calendarioEventoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
  ): Promise<boolean> {
    const entity = await this.calendarioAgendamentoRepository.findById(
      params.id,
      CalendarioAgendamentoTipo.EVENTO,
    );
    ensureExists(entity, "CalendarioEvento", params.id);
    entity.status = CalendarioAgendamentoStatus.INATIVO;
    await this.calendarioAgendamentoRepository.save(entity);
    return true;
  }

  private async toOutputDtoWithRelations(
    entity: CalendarioAgendamentoEntity,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const dto = new CalendarioEventoFindOneOutputRestDto();
    dto.id = entity.id;
    dto.nome = entity.nome;
    dto.dataInicio =
      entity.dataInicio instanceof Date
        ? entity.dataInicio.toISOString().split("T")[0]
        : String(entity.dataInicio);
    dto.dataFim =
      entity.dataFim instanceof Date
        ? entity.dataFim.toISOString().split("T")[0]
        : entity.dataFim
          ? String(entity.dataFim)
          : null;
    dto.diaInteiro = entity.diaInteiro;
    dto.horarioInicio = entity.horarioInicio;
    dto.horarioFim = entity.horarioFim;
    dto.cor = entity.cor;
    dto.repeticao = entity.repeticao;
    dto.status = entity.status;

    const junctions = await this.calendarioAgendamentoJunctionRepository.findJunctions(entity.id);
    dto.turmaIds = junctions.turmaIds;
    dto.perfilIds = junctions.perfilIds;
    dto.calendarioLetivoIds = junctions.calendarioLetivoIds;
    dto.ofertaFormacaoIds = junctions.ofertaFormacaoIds;
    dto.modalidadeIds = junctions.modalidadeIds;

    return dto;
  }
}
