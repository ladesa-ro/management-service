import type { FindOptionsWhere, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import type { IPaginationCriteria } from "@/application/pagination";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { dateToISO, dateToISONullable } from "@/infrastructure.database/typeorm/mapping";
import * as PerfilTypeormMapper from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.mapper";
import * as AmbienteTypeormMapper from "@/modules/ambientes/ambiente/infrastructure.database/typeorm/ambiente.typeorm.mapper";
import * as CalendarioLetivoTypeormMapper from "@/modules/calendario/letivo/infrastructure.database/typeorm/calendario-letivo.typeorm.mapper";
import * as DiarioTypeormMapper from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.mapper";
import * as ModalidadeTypeormMapper from "@/modules/ensino/modalidade/infrastructure.database/typeorm/modalidade.typeorm.mapper";
import * as OfertaFormacaoTypeormMapper from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.mapper";
import * as TurmaTypeormMapper from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.mapper";
import {
  CalendarioAgendamento,
  type ICalendarioAgendamento,
} from "../domain/calendario-agendamento";
import { CalendarioAgendamentoStatus } from "../domain/calendario-agendamento.types";
import {
  CalendarioAgendamentoMetadata,
  type ICalendarioAgendamentoMetadata,
} from "../domain/calendario-agendamento-metadata";
import { CalendarioAgendamentoFindOneQueryResult } from "../domain/queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoListQuery } from "../domain/queries/calendario-agendamento-list.query";
import { calendarioAgendamentoPaginationSpec } from "../domain/queries/calendario-agendamento-list.query.handler.interface";
import type { CalendarioAgendamentoListQueryResult } from "../domain/queries/calendario-agendamento-list.query.result";
import type { ICalendarioAgendamentoRepository } from "../domain/repositories/calendario-agendamento.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoTipo,
} from "./typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoAmbienteEntity } from "./typeorm/calendario-agendamento-ambiente.typeorm.entity";
import { CalendarioAgendamentoCalendarioLetivoEntity } from "./typeorm/calendario-agendamento-calendario-letivo.typeorm.entity";
import { CalendarioAgendamentoDiarioEntity } from "./typeorm/calendario-agendamento-diario.typeorm.entity";
import { CalendarioAgendamentoMetadataEntity } from "./typeorm/calendario-agendamento-metadata.typeorm.entity";
import { CalendarioAgendamentoModalidadeEntity } from "./typeorm/calendario-agendamento-modalidade.typeorm.entity";
import { CalendarioAgendamentoOfertaFormacaoEntity } from "./typeorm/calendario-agendamento-oferta-formacao.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "./typeorm/calendario-agendamento-professor.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "./typeorm/calendario-agendamento-turma.typeorm.entity";

// Deep relations necessarias para cada junction (compativel com os TypeORM mappers dos modulos)
const TURMA_DEEP_RELATIONS = {
  turma: {
    curso: {
      campus: { endereco: { cidade: { estado: true } } },
      ofertaFormacao: { modalidade: true, campus: { endereco: { cidade: { estado: true } } } },
    },
    ambientePadraoAula: { bloco: { campus: { endereco: { cidade: { estado: true } } } } },
  },
};

const PERFIL_DEEP_RELATIONS = {
  perfil: { campus: { endereco: { cidade: { estado: true } } }, usuario: true, cargo: true },
};

const CALENDARIO_LETIVO_DEEP_RELATIONS = {
  calendarioLetivo: {
    campus: { endereco: { cidade: { estado: true } } },
    ofertaFormacao: { modalidade: true, campus: { endereco: { cidade: { estado: true } } } },
  },
};

const OFERTA_FORMACAO_DEEP_RELATIONS = {
  ofertaFormacao: {
    modalidade: true,
    campus: { endereco: { cidade: { estado: true } } },
    ofertaFormacaoNiveisFormacoes: { nivelFormacao: true },
    periodosEntities: { etapas: true },
  },
};

const AMBIENTE_DEEP_RELATIONS = {
  ambiente: { bloco: { campus: { endereco: { cidade: { estado: true } } } } },
};

const DIARIO_DEEP_RELATIONS = {
  diario: {
    calendarioLetivo: {
      campus: { endereco: { cidade: { estado: true } } },
      ofertaFormacao: { modalidade: true, campus: { endereco: { cidade: { estado: true } } } },
    },
    turma: { curso: { campus: { endereco: { cidade: { estado: true } } } } },
    disciplina: true,
    ambientePadrao: { bloco: { campus: { endereco: { cidade: { estado: true } } } } },
  },
};

const agendamentoPaginateConfig = buildTypeOrmPaginateConfig<CalendarioAgendamentoEntity>(
  calendarioAgendamentoPaginationSpec,
);

@Impl()
export class CalendarioAgendamentoTypeOrmRepositoryAdapter
  implements ICalendarioAgendamentoRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ============================================================================
  // Write side
  // ============================================================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamento | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const where: Record<string, unknown> = { id };
    if (tipo !== undefined) where.tipo = tipo;

    const entity = await repo.findOneBy(where as FindOptionsWhere<CalendarioAgendamentoEntity>);
    if (!entity) return null;

    const junctionRefs = await this.findJunctionRefs(id);

    return CalendarioAgendamento.load(this.toDomainData(entity, junctionRefs));
  }

  async save(aggregate: CalendarioAgendamento): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const entity = repo.create(this.toPersistence(aggregate));
    await repo.save(entity);

    await this.replaceJunctions(aggregate);
  }

  async saveNewVersion(
    closedVersion: CalendarioAgendamento,
    newVersion: CalendarioAgendamento,
  ): Promise<void> {
    await this.appTypeormConnection.transaction(async (manager) => {
      const repo = manager.getRepository(CalendarioAgendamentoEntity);

      // Lock the old version row to prevent concurrent updates
      await repo
        .createQueryBuilder()
        .setLock("pessimistic_write")
        .where("id = :id", { id: closedVersion.id })
        .getOne();

      // Close old version
      await repo.update(closedVersion.id, {
        validTo: closedVersion.validTo,
        dateUpdated: closedVersion.dateUpdated,
      });

      // Insert new version
      const entity = repo.create(this.toPersistence(newVersion));
      await repo.save(entity);

      // Create junctions for the new version within the same transaction
      await this.createJunctionsWithManager(manager, newVersion);
    });
  }

  async closeVersion(aggregate: CalendarioAgendamento): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    await repo.update(aggregate.id, {
      validTo: aggregate.validTo,
      dateUpdated: aggregate.dateUpdated,
    });
  }

  // ============================================================================
  // Metadata
  // ============================================================================

  async saveMetadata(metadata: CalendarioAgendamentoMetadata): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoMetadataEntity);
    const entity = repo.create({
      id: metadata.id,
      identificadorExternoCalendarioAgendamento: metadata.identificadorExternoCalendarioAgendamento,
      nome: metadata.nome,
      cor: metadata.cor,
      dateUpdated: metadata.dateUpdated,
    });
    await repo.save(entity);
  }

  async updateMetadata(
    identificadorExterno: string,
    fields: { nome?: string | null; cor?: string | null },
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoMetadataEntity);
    const update: Record<string, unknown> = {};
    if (fields.nome !== undefined) update.nome = fields.nome;
    if (fields.cor !== undefined) update.cor = fields.cor;

    if (Object.keys(update).length > 0) {
      await repo.update(
        { identificadorExternoCalendarioAgendamento: identificadorExterno },
        update,
      );
    }
  }

  async loadMetadata(identificadorExterno: string): Promise<CalendarioAgendamentoMetadata | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoMetadataEntity);
    const entity = await repo.findOneBy({
      identificadorExternoCalendarioAgendamento: identificadorExterno,
    });
    if (!entity) return null;

    return CalendarioAgendamentoMetadata.load(this.toMetadataDomain(entity));
  }

  // ============================================================================
  // Junction operations
  // ============================================================================

  async deleteTurmaJunction(agendamentoId: string, turmaId: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);
    await repo
      .createQueryBuilder()
      .delete()
      .where("id_calendario_agendamento_fk = :agendamentoId", { agendamentoId })
      .andWhere("id_turma_fk = :turmaId", { turmaId })
      .execute();
  }

  // ============================================================================
  // Direct field updates
  // ============================================================================

  async updateStatus(id: string, status: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    await repo.update(id, { status: status as CalendarioAgendamentoStatus });
  }

  // ============================================================================
  // Read side
  // ============================================================================

  async getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoListQuery | null = null,
  ): Promise<CalendarioAgendamentoListQueryResult> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const qb = repo.createQueryBuilder("ca");

    // Por padrao, retornar somente registros ativos (valid_to IS NULL e status != INATIVO)
    qb.andWhere("ca.valid_to IS NULL");

    const hasStatusFilter = dto?.["filter.status"] !== undefined;
    if (!hasStatusFilter) {
      qb.andWhere("ca.status != :defaultExcludeStatus", {
        defaultExcludeStatus: CalendarioAgendamentoStatus.INATIVO,
      });
    }

    // Aplicar filtros de junction via LEFT JOIN + WHERE
    this.applyJunctionFilter(
      qb,
      dto?.["filter.turma.id"],
      CalendarioAgendamentoTurmaEntity,
      "cat",
      "id_turma_fk",
    );
    this.applyJunctionFilter(
      qb,
      dto?.["filter.perfil.id"],
      CalendarioAgendamentoProfessorEntity,
      "cap",
      "id_perfil_fk",
    );
    this.applyJunctionFilter(
      qb,
      dto?.["filter.calendarioLetivo.id"],
      CalendarioAgendamentoCalendarioLetivoEntity,
      "cacl",
      "id_calendario_letivo_fk",
    );
    this.applyJunctionFilter(
      qb,
      dto?.["filter.ofertaFormacao.id"],
      CalendarioAgendamentoOfertaFormacaoEntity,
      "caof",
      "id_oferta_formacao_fk",
    );
    this.applyJunctionFilter(
      qb,
      dto?.["filter.modalidade.id"],
      CalendarioAgendamentoModalidadeEntity,
      "cam",
      "id_modalidade_fk",
    );
    this.applyJunctionFilter(
      qb,
      dto?.["filter.ambiente.id"],
      CalendarioAgendamentoAmbienteEntity,
      "caa",
      "id_ambiente_fk",
    );
    this.applyJunctionFilter(
      qb,
      dto?.["filter.diario.id"],
      CalendarioAgendamentoDiarioEntity,
      "cad",
      "id_diario_fk",
    );

    // Remover filtros de junction do dto para que nestjs-paginate nao tente aplica-los
    const paginationDto = dto ? { ...dto } : null;
    if (paginationDto) {
      delete (paginationDto as Record<string, unknown>)["filter.turma.id"];
      delete (paginationDto as Record<string, unknown>)["filter.perfil.id"];
      delete (paginationDto as Record<string, unknown>)["filter.calendarioLetivo.id"];
      delete (paginationDto as Record<string, unknown>)["filter.ofertaFormacao.id"];
      delete (paginationDto as Record<string, unknown>)["filter.modalidade.id"];
      delete (paginationDto as Record<string, unknown>)["filter.ambiente.id"];
      delete (paginationDto as Record<string, unknown>)["filter.diario.id"];
    }

    const criteria: IPaginationCriteria = {
      ...(paginationDto as object),
      sortBy: (paginationDto as Record<string, unknown> | null)?.sortBy
        ? ((paginationDto as Record<string, unknown>).sortBy as string[])
        : undefined,
      filters: this.extractFilters(paginationDto as Record<string, unknown> | null),
    };

    const paginated = await this.paginationAdapter.paginate<CalendarioAgendamentoEntity>(
      qb as unknown as SelectQueryBuilder<ObjectLiteral>,
      criteria,
      agendamentoPaginateConfig,
    );

    // Hidratar cada resultado com junctions + metadata
    const hydratedData: CalendarioAgendamentoFindOneQueryResult[] = [];

    for (const entity of paginated.data as CalendarioAgendamentoEntity[]) {
      const [junctions, metadata] = await Promise.all([
        this.findJunctionEntities(entity.id),
        this.findMetadataByIdentificadorExterno(entity.identificadorExterno),
      ]);
      hydratedData.push(this.toQueryResult(entity, junctions, metadata));
    }

    return {
      meta: paginated.meta,
      data: hydratedData,
      links: paginated.links,
    } as CalendarioAgendamentoListQueryResult;
  }

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const where: Record<string, unknown> = { id };
    if (tipo !== undefined) where.tipo = tipo;

    const entity = await repo.findOneBy(where as FindOptionsWhere<CalendarioAgendamentoEntity>);
    if (!entity) return null;

    const [junctions, metadata] = await Promise.all([
      this.findJunctionEntities(id),
      this.findMetadataByIdentificadorExterno(entity.identificadorExterno),
    ]);

    return this.toQueryResult(entity, junctions, metadata);
  }

  async findByDateRange(query: {
    dateStart: string;
    dateEnd: string;
    campus?: string;
    turma?: string;
    professor?: string;
    tipo?: CalendarioAgendamentoTipo;
  }): Promise<CalendarioAgendamentoFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const qb = repo
      .createQueryBuilder("ca")
      .where("ca.data_inicio <= :dateEnd", { dateEnd: query.dateEnd })
      .andWhere("(ca.data_fim IS NULL OR ca.data_fim >= :dateStart)", {
        dateStart: query.dateStart,
      })
      .andWhere("ca.status = :status", { status: CalendarioAgendamentoStatus.ATIVO })
      .andWhere("ca.valid_to IS NULL");

    if (query.tipo) {
      qb.andWhere("ca.tipo = :tipo", { tipo: query.tipo });
    }

    if (query.turma) {
      qb.innerJoin(
        CalendarioAgendamentoTurmaEntity,
        "cat",
        "cat.id_calendario_agendamento_fk = ca.id",
      ).andWhere("cat.id_turma_fk = :turmaId", { turmaId: query.turma });
    }

    if (query.professor) {
      qb.innerJoin(
        CalendarioAgendamentoProfessorEntity,
        "cap",
        "cap.id_calendario_agendamento_fk = ca.id",
      ).andWhere("cap.id_perfil_fk = :professorId", { professorId: query.professor });
    }

    if (query.campus) {
      qb.innerJoin(
        CalendarioAgendamentoTurmaEntity,
        query.turma ? "cat2" : "cat",
        `${query.turma ? "cat2" : "cat"}.id_calendario_agendamento_fk = ca.id`,
      )
        .innerJoin("turma", "t", `t.id = ${query.turma ? "cat2" : "cat"}.id_turma_fk`)
        .innerJoin("curso", "c", "c.id = t.id_curso_fk")
        .andWhere("c.id_campus_fk = :campusId", { campusId: query.campus });
    }

    qb.orderBy("ca.data_inicio", "ASC").addOrderBy("ca.horario_inicio", "ASC");

    const entities = await qb.getMany();
    const results: CalendarioAgendamentoFindOneQueryResult[] = [];

    for (const entity of entities) {
      const [junctions, metadata] = await Promise.all([
        this.findJunctionEntities(entity.id),
        this.findMetadataByIdentificadorExterno(entity.identificadorExterno),
      ]);
      results.push(this.toQueryResult(entity, junctions, metadata));
    }

    return results;
  }

  // ============================================================================
  // Pagination helpers
  // ============================================================================

  private applyJunctionFilter(
    qb: SelectQueryBuilder<CalendarioAgendamentoEntity>,
    filterValue: string | string[] | number | number[] | null | undefined,
    junctionEntity: new () => unknown,
    alias: string,
    fkColumn: string,
  ): void {
    if (filterValue === undefined || filterValue === null) return;

    const values = Array.isArray(filterValue) ? filterValue : [filterValue];
    if (values.length === 0) return;

    const paramName = `${alias}Ids`;

    qb.innerJoin(
      junctionEntity as never,
      alias,
      `${alias}.id_calendario_agendamento_fk = ca.id`,
    ).andWhere(`${alias}.${fkColumn} IN (:...${paramName})`, { [paramName]: values });
  }

  private extractFilters(
    dto: Record<string, unknown> | null | undefined,
  ): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};
    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (
          typeof value === "string" ||
          (Array.isArray(value) && value.every((v) => typeof v === "string"))
        ) {
          filters[key.replace("filter.", "")] = value;
        }
      }
    }

    return filters;
  }

  // ============================================================================
  // Mappers privados
  // ============================================================================

  private toPersistence(aggregate: CalendarioAgendamento): Partial<CalendarioAgendamentoEntity> {
    return {
      id: aggregate.id,
      identificadorExterno: aggregate.identificadorExterno,
      tipo: aggregate.tipo as CalendarioAgendamentoTipo,
      dataInicio: aggregate.dataInicio,
      dataFim: aggregate.dataFim,
      diaInteiro: aggregate.diaInteiro,
      horarioInicio: aggregate.horarioInicio,
      horarioFim: aggregate.horarioFim,
      repeticao: aggregate.repeticao,
      // nome e cor vivem na tabela metadata — coluna principal mantida para backcompat
      nome: null,
      cor: null,
      status: aggregate.status as CalendarioAgendamentoStatus | null,
      version: aggregate.version,
      previousVersionId: aggregate.previousVersionId,
      validFrom: aggregate.validFrom,
      validTo: aggregate.validTo,
      dateCreated: aggregate.dateCreated,
      dateUpdated: aggregate.dateUpdated,
      dateDeleted: aggregate.dateDeleted,
    };
  }

  private toDomainData(
    entity: CalendarioAgendamentoEntity,
    junctionRefs: IJunctionRefs,
  ): ICalendarioAgendamento {
    return {
      id: entity.id,
      identificadorExterno: entity.identificadorExterno,
      tipo: entity.tipo,
      dataInicio: this.dateToString(entity.dataInicio),
      dataFim: entity.dataFim ? this.dateToString(entity.dataFim) : null,
      diaInteiro: entity.diaInteiro,
      horarioInicio: entity.horarioInicio,
      horarioFim: entity.horarioFim,
      repeticao: entity.repeticao,
      status: entity.status,

      turmas: junctionRefs.turmas,
      perfis: junctionRefs.perfis,
      calendariosLetivos: junctionRefs.calendariosLetivos,
      ofertasFormacao: junctionRefs.ofertasFormacao,
      modalidades: junctionRefs.modalidades,
      ambientes: junctionRefs.ambientes,
      diarios: junctionRefs.diarios,

      version: entity.version,
      previousVersionId: entity.previousVersionId,
      validFrom: dateToISO(entity.validFrom),
      validTo: dateToISONullable(entity.validTo),

      dateCreated: dateToISO(entity.dateCreated),
      dateUpdated: dateToISO(entity.dateUpdated),
      dateDeleted: dateToISONullable(entity.dateDeleted),
    };
  }

  private toQueryResult(
    entity: CalendarioAgendamentoEntity,
    junctions: IJunctionEntities,
    metadata: CalendarioAgendamentoMetadataEntity | null,
  ): CalendarioAgendamentoFindOneQueryResult {
    const result = new CalendarioAgendamentoFindOneQueryResult();

    result.id = entity.id;
    result.identificadorExterno = entity.identificadorExterno;
    result.tipo = entity.tipo;
    result.nome = metadata?.nome ?? entity.nome;
    result.dataInicio = this.dateToString(entity.dataInicio);
    result.dataFim = entity.dataFim ? this.dateToString(entity.dataFim) : null;
    result.diaInteiro = entity.diaInteiro;
    result.horarioInicio = entity.horarioInicio;
    result.horarioFim = entity.horarioFim;
    result.cor = metadata?.cor ?? entity.cor;
    result.repeticao = entity.repeticao;
    result.status = entity.status;
    result.version = entity.version;

    // Hidratar relacoes usando TypeORM mappers delegados dos modulos (padrao do projeto)
    result.turmas = junctions.turmas.map((j) =>
      TurmaTypeormMapper.entityToFindOneQueryResult.map(j.turma),
    );
    result.perfis = junctions.perfis.map((j) =>
      PerfilTypeormMapper.entityToFindOneQueryResult.map(j.perfil),
    );
    result.calendariosLetivos = junctions.calendariosLetivos.map((j) =>
      CalendarioLetivoTypeormMapper.entityToFindOneQueryResult.map(j.calendarioLetivo),
    );
    result.ofertasFormacao = junctions.ofertasFormacao.map((j) =>
      OfertaFormacaoTypeormMapper.entityToFindOneQueryResult.map(j.ofertaFormacao),
    );
    result.modalidades = junctions.modalidades.map((j) =>
      ModalidadeTypeormMapper.entityToFindOneQueryResult.map(j.modalidade),
    );
    result.ambientes = junctions.ambientes.map((j) =>
      AmbienteTypeormMapper.entityToFindOneQueryResult.map(j.ambiente),
    );
    result.diarios = junctions.diarios.map((j) =>
      DiarioTypeormMapper.entityToFindOneQueryResult.map(j.diario),
    );

    result.dateCreated = dateToISO(entity.dateCreated);
    result.dateUpdated = dateToISO(entity.dateUpdated);
    result.dateDeleted = dateToISONullable(entity.dateDeleted);

    return result;
  }

  private toMetadataDomain(
    entity: CalendarioAgendamentoMetadataEntity,
  ): ICalendarioAgendamentoMetadata {
    return {
      id: entity.id,
      identificadorExternoCalendarioAgendamento: entity.identificadorExternoCalendarioAgendamento,
      nome: entity.nome,
      cor: entity.cor,
      dateUpdated: dateToISO(entity.dateUpdated),
    };
  }

  private dateToString(d: string): string {
    return String(d);
  }

  // ============================================================================
  // Metadata lookup
  // ============================================================================

  private async findMetadataByIdentificadorExterno(
    identificadorExterno: string,
  ): Promise<CalendarioAgendamentoMetadataEntity | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoMetadataEntity);
    return repo.findOneBy({
      identificadorExternoCalendarioAgendamento: identificadorExterno,
    });
  }

  // ============================================================================
  // Junctions — refs ({id} objects para domain, sem deep relations)
  // ============================================================================

  private async findJunctionRefs(eventoId: string): Promise<IJunctionRefs> {
    const [turmas, perfis, cls, ofs, mods, ambs, diars] = await Promise.all([
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoTurmaEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoProfessorEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoCalendarioLetivoEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoOfertaFormacaoEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoModalidadeEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoAmbienteEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoDiarioEntity)
        .find({ where: { calendarioAgendamento: { id: eventoId } } }),
    ]);

    return {
      turmas: turmas.map((j) => ({ id: j.turma?.id })).filter((r) => r.id),
      perfis: perfis.map((j) => ({ id: j.perfil?.id })).filter((r) => r.id),
      calendariosLetivos: cls.map((j) => ({ id: j.calendarioLetivo?.id })).filter((r) => r.id),
      ofertasFormacao: ofs.map((j) => ({ id: j.ofertaFormacao?.id })).filter((r) => r.id),
      modalidades: mods.map((j) => ({ id: j.modalidade?.id })).filter((r) => r.id),
      ambientes: ambs.map((j) => ({ id: j.ambiente?.id })).filter((r) => r.id),
      diarios: diars.map((j) => ({ id: j.diario?.id })).filter((r) => r.id),
    };
  }

  // ============================================================================
  // Junctions — entities com deep relations carregadas (para query results)
  // ============================================================================

  private async findJunctionEntities(eventoId: string): Promise<IJunctionEntities> {
    const where = { calendarioAgendamento: { id: eventoId } };

    const [turmas, perfis, cls, ofs, mods, ambs, diars] = await Promise.all([
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoTurmaEntity)
        .find({ where, relations: TURMA_DEEP_RELATIONS }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoProfessorEntity)
        .find({ where, relations: PERFIL_DEEP_RELATIONS }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoCalendarioLetivoEntity)
        .find({ where, relations: CALENDARIO_LETIVO_DEEP_RELATIONS }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoOfertaFormacaoEntity)
        .find({ where, relations: OFERTA_FORMACAO_DEEP_RELATIONS }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoModalidadeEntity)
        .find({ where, relations: { modalidade: true } }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoAmbienteEntity)
        .find({ where, relations: AMBIENTE_DEEP_RELATIONS }),
      this.appTypeormConnection
        .getRepository(CalendarioAgendamentoDiarioEntity)
        .find({ where, relations: DIARIO_DEEP_RELATIONS }),
    ]);

    return {
      turmas: turmas.filter((j) => j.turma),
      perfis: perfis.filter((j) => j.perfil),
      calendariosLetivos: cls.filter((j) => j.calendarioLetivo),
      ofertasFormacao: ofs.filter((j) => j.ofertaFormacao),
      modalidades: mods.filter((j) => j.modalidade),
      ambientes: ambs.filter((j) => j.ambiente),
      diarios: diars.filter((j) => j.diario),
    };
  }

  // ============================================================================
  // Junctions — write
  // ============================================================================

  private async replaceJunctions(aggregate: CalendarioAgendamento): Promise<void> {
    await Promise.all([
      this.replaceJunctionSet(
        CalendarioAgendamentoTurmaEntity,
        aggregate.id,
        aggregate.turmas,
        "turma",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoProfessorEntity,
        aggregate.id,
        aggregate.perfis,
        "perfil",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoCalendarioLetivoEntity,
        aggregate.id,
        aggregate.calendariosLetivos,
        "calendarioLetivo",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoOfertaFormacaoEntity,
        aggregate.id,
        aggregate.ofertasFormacao,
        "ofertaFormacao",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoModalidadeEntity,
        aggregate.id,
        aggregate.modalidades,
        "modalidade",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoAmbienteEntity,
        aggregate.id,
        aggregate.ambientes,
        "ambiente",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoDiarioEntity,
        aggregate.id,
        aggregate.diarios,
        "diario",
      ),
    ]);
  }

  private async replaceJunctionSet<T extends { id: string }>(
    entityClass: new () => T,
    agendamentoId: string,
    refs: Array<{ id: string }>,
    relationKey: string,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(entityClass);

    await repo
      .createQueryBuilder()
      .delete()
      .where("id_calendario_agendamento_fk = :agendamentoId", { agendamentoId })
      .execute();

    for (const ref of refs) {
      const entity = new entityClass();
      entity.id = generateUuidV7();
      Object.assign(entity, {
        [relationKey]: { id: ref.id },
        calendarioAgendamento: { id: agendamentoId },
      });
      await repo.save(entity);
    }
  }

  private async createJunctionsWithManager(
    manager: import("typeorm").EntityManager,
    aggregate: CalendarioAgendamento,
  ): Promise<void> {
    const createSet = async <T extends { id: string }>(
      entityClass: new () => T,
      refs: Array<{ id: string }>,
      relationKey: string,
    ) => {
      const repo = manager.getRepository(entityClass);
      for (const ref of refs) {
        const entity = new entityClass();
        entity.id = generateUuidV7();
        Object.assign(entity, {
          [relationKey]: { id: ref.id },
          calendarioAgendamento: { id: aggregate.id },
        });
        await repo.save(entity);
      }
    };

    await Promise.all([
      createSet(CalendarioAgendamentoTurmaEntity, aggregate.turmas, "turma"),
      createSet(CalendarioAgendamentoProfessorEntity, aggregate.perfis, "perfil"),
      createSet(
        CalendarioAgendamentoCalendarioLetivoEntity,
        aggregate.calendariosLetivos,
        "calendarioLetivo",
      ),
      createSet(
        CalendarioAgendamentoOfertaFormacaoEntity,
        aggregate.ofertasFormacao,
        "ofertaFormacao",
      ),
      createSet(CalendarioAgendamentoModalidadeEntity, aggregate.modalidades, "modalidade"),
      createSet(CalendarioAgendamentoAmbienteEntity, aggregate.ambientes, "ambiente"),
      createSet(CalendarioAgendamentoDiarioEntity, aggregate.diarios, "diario"),
    ]);
  }
}

interface IJunctionRefs {
  turmas: Array<{ id: string }>;
  perfis: Array<{ id: string }>;
  calendariosLetivos: Array<{ id: string }>;
  ofertasFormacao: Array<{ id: string }>;
  modalidades: Array<{ id: string }>;
  ambientes: Array<{ id: string }>;
  diarios: Array<{ id: string }>;
}

interface IJunctionEntities {
  turmas: CalendarioAgendamentoTurmaEntity[];
  perfis: CalendarioAgendamentoProfessorEntity[];
  calendariosLetivos: CalendarioAgendamentoCalendarioLetivoEntity[];
  ofertasFormacao: CalendarioAgendamentoOfertaFormacaoEntity[];
  modalidades: CalendarioAgendamentoModalidadeEntity[];
  ambientes: CalendarioAgendamentoAmbienteEntity[];
  diarios: CalendarioAgendamentoDiarioEntity[];
}
