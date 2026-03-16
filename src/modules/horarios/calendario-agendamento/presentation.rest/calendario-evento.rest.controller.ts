import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource, In } from "typeorm";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "@/modules/horarios/calendario-agendamento-turma/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "@/modules/horarios/calendario-agendamento-professor/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";
import { CalendarioAgendamentoCalendarioLetivoEntity } from "@/modules/horarios/calendario-agendamento-calendario-letivo/infrastructure.database/typeorm/calendario-agendamento-calendario-letivo.typeorm.entity";
import { CalendarioAgendamentoOfertaFormacaoEntity } from "@/modules/horarios/calendario-agendamento-oferta-formacao/infrastructure.database/typeorm/calendario-agendamento-oferta-formacao.typeorm.entity";
import { CalendarioAgendamentoModalidadeEntity } from "@/modules/horarios/calendario-agendamento-modalidade/infrastructure.database/typeorm/calendario-agendamento-modalidade.typeorm.entity";
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
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista eventos do calendario", operationId: "calendarioEventoFindAll" })
  @ApiOkResponse({ type: CalendarioEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("search") search?: string,
    @Query("filter.turma.id") filterTurmaId?: string,
    @Query("filter.ofertaFormacao.id") filterOfertaFormacaoId?: string,
    @Query("filter.periodo") filterPeriodo?: string,
  ): Promise<CalendarioEventoListOutputRestDto> {
    const repo = this.dataSource.getRepository(CalendarioAgendamentoEntity);

    const qb = repo
      .createQueryBuilder("ca")
      .where("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.EVENTO })
      .orderBy("ca.data_inicio", "ASC");

    if (search) {
      qb.andWhere("ca.nome ILIKE :search", { search: `%${search}%` });
    }

    if (filterTurmaId) {
      qb.innerJoin(CalendarioAgendamentoTurmaEntity, "cat", "cat.id_calendario_agendamento_fk = ca.id")
        .andWhere("cat.id_turma_fk = :filterTurmaId", { filterTurmaId });
    }

    if (filterOfertaFormacaoId) {
      qb.innerJoin(CalendarioAgendamentoOfertaFormacaoEntity, "caof", "caof.id_calendario_agendamento_fk = ca.id")
        .andWhere("caof.id_oferta_formacao_fk = :filterOfertaFormacaoId", { filterOfertaFormacaoId });
    }

    const entities = await qb.getMany();

    // Load junction data for each entity
    const data = await Promise.all(entities.map((e) => this.toOutputDtoWithRelations(e)));

    return { data };
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um evento por ID", operationId: "calendarioEventoFindById" })
  @ApiOkResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const repo = this.dataSource.getRepository(CalendarioAgendamentoEntity);
    const entity = await repo.findOneBy({ id: params.id, tipo: CalendarioAgendamentoTipo.EVENTO });
    ensureExists(entity, "CalendarioEvento", params.id);
    return this.toOutputDtoWithRelations(entity!);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um evento no calendario", operationId: "calendarioEventoCreate" })
  @ApiCreatedResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
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

    await this.dataSource.transaction(async (manager) => {
      await manager.save(CalendarioAgendamentoEntity, entity);
      await this.syncJunctions(manager, entity.id, dto);
    });

    return this.toOutputDtoWithRelations(entity);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um evento", operationId: "calendarioEventoUpdate" })
  @ApiOkResponse({ type: CalendarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
    @Body() dto: CalendarioEventoUpdateInputRestDto,
  ): Promise<CalendarioEventoFindOneOutputRestDto> {
    const repo = this.dataSource.getRepository(CalendarioAgendamentoEntity);
    const entity = await repo.findOneBy({ id: params.id, tipo: CalendarioAgendamentoTipo.EVENTO });
    ensureExists(entity, "CalendarioEvento", params.id);

    if (dto.nome !== undefined) entity!.nome = dto.nome;
    if (dto.dataInicio !== undefined) entity!.dataInicio = new Date(dto.dataInicio);
    if (dto.dataFim !== undefined) entity!.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    if (dto.diaInteiro !== undefined) entity!.diaInteiro = dto.diaInteiro;
    if (dto.horarioInicio !== undefined) entity!.horarioInicio = dto.horarioInicio;
    if (dto.horarioFim !== undefined) entity!.horarioFim = dto.horarioFim;
    if (dto.cor !== undefined) entity!.cor = dto.cor ?? null;
    if (dto.repeticao !== undefined) entity!.repeticao = dto.repeticao ?? null;

    await this.dataSource.transaction(async (manager) => {
      await manager.save(CalendarioAgendamentoEntity, entity!);
      await this.syncJunctions(manager, entity!.id, dto);
    });

    return this.toOutputDtoWithRelations(entity!);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um evento", operationId: "calendarioEventoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: CalendarioEventoFindOneParamsRestDto,
  ): Promise<boolean> {
    const repo = this.dataSource.getRepository(CalendarioAgendamentoEntity);
    const entity = await repo.findOneBy({ id: params.id, tipo: CalendarioAgendamentoTipo.EVENTO });
    ensureExists(entity, "CalendarioEvento", params.id);
    entity!.status = CalendarioAgendamentoStatus.INATIVO;
    await repo.save(entity!);
    return true;
  }

  private async syncJunctions(
    manager: import("typeorm").EntityManager,
    eventoId: string,
    dto: { turmaIds?: string[]; perfilIds?: string[]; calendarioLetivoIds?: string[]; ofertaFormacaoIds?: string[]; modalidadeIds?: string[] },
  ) {
    if (dto.turmaIds !== undefined) {
      await manager.delete(CalendarioAgendamentoTurmaEntity, { idCalendarioAgendamentoFk: eventoId });
      for (const turmaId of dto.turmaIds) {
        const j = new CalendarioAgendamentoTurmaEntity();
        j.id = generateUuidV7();
        j.idTurmaFk = turmaId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).turma = { id: turmaId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await manager.save(CalendarioAgendamentoTurmaEntity, j);
      }
    }

    if (dto.perfilIds !== undefined) {
      await manager.delete(CalendarioAgendamentoProfessorEntity, { idCalendarioAgendamentoFk: eventoId });
      for (const perfilId of dto.perfilIds) {
        const j = new CalendarioAgendamentoProfessorEntity();
        j.id = generateUuidV7();
        j.idPerfilFk = perfilId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).perfil = { id: perfilId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await manager.save(CalendarioAgendamentoProfessorEntity, j);
      }
    }

    if (dto.calendarioLetivoIds !== undefined) {
      await manager.delete(CalendarioAgendamentoCalendarioLetivoEntity, { idCalendarioAgendamentoFk: eventoId });
      for (const clId of dto.calendarioLetivoIds) {
        const j = new CalendarioAgendamentoCalendarioLetivoEntity();
        j.id = generateUuidV7();
        j.idCalendarioLetivoFk = clId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).calendarioLetivo = { id: clId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await manager.save(CalendarioAgendamentoCalendarioLetivoEntity, j);
      }
    }

    if (dto.ofertaFormacaoIds !== undefined) {
      await manager.delete(CalendarioAgendamentoOfertaFormacaoEntity, { idCalendarioAgendamentoFk: eventoId });
      for (const ofId of dto.ofertaFormacaoIds) {
        const j = new CalendarioAgendamentoOfertaFormacaoEntity();
        j.id = generateUuidV7();
        j.idOfertaFormacaoFk = ofId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).ofertaFormacao = { id: ofId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await manager.save(CalendarioAgendamentoOfertaFormacaoEntity, j);
      }
    }

    if (dto.modalidadeIds !== undefined) {
      await manager.delete(CalendarioAgendamentoModalidadeEntity, { idCalendarioAgendamentoFk: eventoId });
      for (const modId of dto.modalidadeIds) {
        const j = new CalendarioAgendamentoModalidadeEntity();
        j.id = generateUuidV7();
        j.idModalidadeFk = modId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).modalidade = { id: modId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await manager.save(CalendarioAgendamentoModalidadeEntity, j);
      }
    }
  }

  private async toOutputDtoWithRelations(entity: CalendarioAgendamentoEntity): Promise<CalendarioEventoFindOneOutputRestDto> {
    const dto = new CalendarioEventoFindOneOutputRestDto();
    dto.id = entity.id;
    dto.nome = entity.nome;
    dto.dataInicio = entity.dataInicio instanceof Date
      ? entity.dataInicio.toISOString().split("T")[0]
      : String(entity.dataInicio);
    dto.dataFim = entity.dataFim instanceof Date
      ? entity.dataFim.toISOString().split("T")[0]
      : entity.dataFim ? String(entity.dataFim) : null;
    dto.diaInteiro = entity.diaInteiro;
    dto.horarioInicio = entity.horarioInicio;
    dto.horarioFim = entity.horarioFim;
    dto.cor = entity.cor;
    dto.repeticao = entity.repeticao;
    dto.status = entity.status;

    // Load junction data
    const turmaJunctions = await this.dataSource.getRepository(CalendarioAgendamentoTurmaEntity)
      .find({ where: { idCalendarioAgendamentoFk: entity.id } });
    dto.turmaIds = turmaJunctions.map((j) => j.idTurmaFk);

    const profJunctions = await this.dataSource.getRepository(CalendarioAgendamentoProfessorEntity)
      .find({ where: { idCalendarioAgendamentoFk: entity.id } });
    dto.perfilIds = profJunctions.map((j) => j.idPerfilFk);

    const clJunctions = await this.dataSource.getRepository(CalendarioAgendamentoCalendarioLetivoEntity)
      .find({ where: { idCalendarioAgendamentoFk: entity.id } });
    dto.calendarioLetivoIds = clJunctions.map((j) => j.idCalendarioLetivoFk);

    const ofJunctions = await this.dataSource.getRepository(CalendarioAgendamentoOfertaFormacaoEntity)
      .find({ where: { idCalendarioAgendamentoFk: entity.id } });
    dto.ofertaFormacaoIds = ofJunctions.map((j) => j.idOfertaFormacaoFk);

    const modJunctions = await this.dataSource.getRepository(CalendarioAgendamentoModalidadeEntity)
      .find({ where: { idCalendarioAgendamentoFk: entity.id } });
    dto.modalidadeIds = modJunctions.map((j) => j.idModalidadeFk);

    return dto;
  }
}
