import type { FindOptionsWhere } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  CalendarioAgendamento,
  type ICalendarioAgendamento,
} from "../domain/calendario-agendamento";
import { CalendarioAgendamentoStatus } from "../domain/calendario-agendamento.types";
import type { CalendarioAgendamentoFindEventosQuery } from "../domain/queries/calendario-agendamento-find-eventos.query.handler.interface";
import { CalendarioAgendamentoFindOneQueryResult } from "../domain/queries/calendario-agendamento-find-one.query.result";
import type { ICalendarioAgendamentoRepository } from "../domain/repositories/calendario-agendamento.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoTipo,
} from "./typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoAmbienteEntity } from "./typeorm/calendario-agendamento-ambiente.typeorm.entity";
import { CalendarioAgendamentoCalendarioLetivoEntity } from "./typeorm/calendario-agendamento-calendario-letivo.typeorm.entity";
import { CalendarioAgendamentoModalidadeEntity } from "./typeorm/calendario-agendamento-modalidade.typeorm.entity";
import { CalendarioAgendamentoOfertaFormacaoEntity } from "./typeorm/calendario-agendamento-oferta-formacao.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "./typeorm/calendario-agendamento-professor.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "./typeorm/calendario-agendamento-turma.typeorm.entity";

@DeclareImplementation()
export class CalendarioAgendamentoTypeOrmRepositoryAdapter
  implements ICalendarioAgendamentoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
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

    const junctions = await this.findJunctions(id);

    return CalendarioAgendamento.load(this.toDomainData(entity, junctions));
  }

  async save(aggregate: CalendarioAgendamento): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const entity = repo.create({
      id: aggregate.id,
      tipo: aggregate.tipo as CalendarioAgendamentoTipo,
      nome: aggregate.nome,
      dataInicio: new Date(aggregate.dataInicio),
      dataFim: aggregate.dataFim ? new Date(aggregate.dataFim) : null,
      diaInteiro: aggregate.diaInteiro,
      horarioInicio: aggregate.horarioInicio,
      horarioFim: aggregate.horarioFim,
      cor: aggregate.cor,
      repeticao: aggregate.repeticao,
      status: aggregate.status as CalendarioAgendamentoStatus | null,
    });
    await repo.save(entity);

    await this.replaceJunctions(aggregate);
  }

  async inactivateById(id: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    await repo.update(id, { status: CalendarioAgendamentoStatus.INATIVO });
  }

  // ============================================================================
  // Read side
  // ============================================================================

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

    const junctions = await this.findJunctions(id);

    return this.toQueryResult(entity, junctions);
  }

  async getFindEventosQueryResult(
    _accessContext: IAccessContext | null,
    query: CalendarioAgendamentoFindEventosQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const qb = repo
      .createQueryBuilder("ca")
      .where("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.EVENTO })
      .orderBy("ca.data_inicio", "ASC");

    if (query.search) {
      qb.andWhere("ca.nome ILIKE :search", { search: `%${query.search}%` });
    }

    if (query.filterTurmaId) {
      qb.innerJoin(
        CalendarioAgendamentoTurmaEntity,
        "cat",
        "cat.id_calendario_agendamento_fk = ca.id",
      ).andWhere("cat.id_turma_fk = :filterTurmaId", {
        filterTurmaId: query.filterTurmaId,
      });
    }

    if (query.filterOfertaFormacaoId) {
      qb.innerJoin(
        CalendarioAgendamentoOfertaFormacaoEntity,
        "caof",
        "caof.id_calendario_agendamento_fk = ca.id",
      ).andWhere("caof.id_oferta_formacao_fk = :filterOfertaFormacaoId", {
        filterOfertaFormacaoId: query.filterOfertaFormacaoId,
      });
    }

    const entities = await qb.getMany();

    return Promise.all(
      entities.map(async (entity) => {
        const junctions = await this.findJunctions(entity.id);
        return this.toQueryResult(entity, junctions);
      }),
    );
  }

  // ============================================================================
  // Mappers privados
  // ============================================================================

  private toDomainData(
    entity: CalendarioAgendamentoEntity,
    junctions: IJunctionData,
  ): ICalendarioAgendamento {
    return {
      id: entity.id,
      tipo: entity.tipo,
      nome: entity.nome,
      dataInicio: this.dateToString(entity.dataInicio),
      dataFim: entity.dataFim ? this.dateToString(entity.dataFim) : null,
      diaInteiro: entity.diaInteiro,
      horarioInicio: entity.horarioInicio,
      horarioFim: entity.horarioFim,
      cor: entity.cor,
      repeticao: entity.repeticao,
      status: entity.status,

      turmaIds: junctions.turmaIds,
      perfilIds: junctions.perfilIds,
      calendarioLetivoIds: junctions.calendarioLetivoIds,
      ofertaFormacaoIds: junctions.ofertaFormacaoIds,
      modalidadeIds: junctions.modalidadeIds,
      ambienteIds: junctions.ambienteIds,
    };
  }

  private toQueryResult(
    entity: CalendarioAgendamentoEntity,
    junctions: IJunctionData,
  ): CalendarioAgendamentoFindOneQueryResult {
    const result = new CalendarioAgendamentoFindOneQueryResult();

    result.id = entity.id;
    result.tipo = entity.tipo;
    result.nome = entity.nome;
    result.dataInicio = this.dateToString(entity.dataInicio);
    result.dataFim = entity.dataFim ? this.dateToString(entity.dataFim) : null;
    result.diaInteiro = entity.diaInteiro;
    result.horarioInicio = entity.horarioInicio;
    result.horarioFim = entity.horarioFim;
    result.cor = entity.cor;
    result.repeticao = entity.repeticao;
    result.status = entity.status;

    result.turmaIds = junctions.turmaIds;
    result.perfilIds = junctions.perfilIds;
    result.calendarioLetivoIds = junctions.calendarioLetivoIds;
    result.ofertaFormacaoIds = junctions.ofertaFormacaoIds;
    result.modalidadeIds = junctions.modalidadeIds;
    result.ambienteIds = junctions.ambienteIds;

    return result;
  }

  private dateToString(d: Date): string {
    return d instanceof Date ? d.toISOString().split("T")[0] : String(d);
  }

  // ============================================================================
  // Métodos privados de persistência de junções
  // ============================================================================

  private async findJunctions(eventoId: string): Promise<IJunctionData> {
    const [turmaJunctions, profJunctions, clJunctions, ofJunctions, modJunctions, ambJunctions] =
      await Promise.all([
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
      ]);

    return {
      turmaIds: turmaJunctions.map((j) => j.turma?.id).filter(Boolean),
      perfilIds: profJunctions.map((j) => j.perfil?.id).filter(Boolean),
      calendarioLetivoIds: clJunctions.map((j) => j.calendarioLetivo?.id).filter(Boolean),
      ofertaFormacaoIds: ofJunctions.map((j) => j.ofertaFormacao?.id).filter(Boolean),
      modalidadeIds: modJunctions.map((j) => j.modalidade?.id).filter(Boolean),
      ambienteIds: ambJunctions.map((j) => j.ambiente?.id).filter(Boolean),
    };
  }

  private async replaceJunctions(aggregate: CalendarioAgendamento): Promise<void> {
    await Promise.all([
      this.replaceJunctionSet(
        CalendarioAgendamentoTurmaEntity,
        aggregate.id,
        aggregate.turmaIds,
        "turma",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoProfessorEntity,
        aggregate.id,
        aggregate.perfilIds,
        "perfil",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoCalendarioLetivoEntity,
        aggregate.id,
        aggregate.calendarioLetivoIds,
        "calendarioLetivo",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoOfertaFormacaoEntity,
        aggregate.id,
        aggregate.ofertaFormacaoIds,
        "ofertaFormacao",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoModalidadeEntity,
        aggregate.id,
        aggregate.modalidadeIds,
        "modalidade",
      ),
      this.replaceJunctionSet(
        CalendarioAgendamentoAmbienteEntity,
        aggregate.id,
        aggregate.ambienteIds,
        "ambiente",
      ),
    ]);
  }

  private async replaceJunctionSet<T extends { id: string }>(
    entityClass: new () => T,
    agendamentoId: string,
    ids: string[],
    relationKey: string,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(entityClass);

    await repo.delete({
      calendarioAgendamento: { id: agendamentoId },
    } as unknown as FindOptionsWhere<T>);

    for (const refId of ids) {
      const entity = new entityClass();
      entity.id = generateUuidV7();
      Object.assign(entity, {
        [relationKey]: { id: refId },
        calendarioAgendamento: { id: agendamentoId },
      });
      await repo.save(entity);
    }
  }
}

interface IJunctionData {
  turmaIds: string[];
  perfilIds: string[];
  calendarioLetivoIds: string[];
  ofertaFormacaoIds: string[];
  modalidadeIds: string[];
  ambienteIds: string[];
}
