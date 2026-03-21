import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { CalendarioAgendamentoCalendarioLetivoEntity } from "@/modules/horarios/calendario-agendamento-calendario-letivo/infrastructure.database/typeorm/calendario-agendamento-calendario-letivo.typeorm.entity";
import { CalendarioAgendamentoModalidadeEntity } from "@/modules/horarios/calendario-agendamento-modalidade/infrastructure.database/typeorm/calendario-agendamento-modalidade.typeorm.entity";
import { CalendarioAgendamentoOfertaFormacaoEntity } from "@/modules/horarios/calendario-agendamento-oferta-formacao/infrastructure.database/typeorm/calendario-agendamento-oferta-formacao.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "@/modules/horarios/calendario-agendamento-professor/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "@/modules/horarios/calendario-agendamento-turma/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
import type {
  ICalendarioAgendamentoFindEventosOptions,
  ICalendarioAgendamentoRepository,
} from "../domain/repositories/calendario-agendamento.repository.interface";
import type {
  ICalendarioAgendamentoJunctionData,
  ICalendarioAgendamentoJunctionRepository,
  ICalendarioAgendamentoJunctionSyncData,
} from "../domain/repositories/calendario-agendamento-junction.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoTipo,
} from "./typeorm/calendario-agendamento.typeorm.entity";

@DeclareImplementation()
export class CalendarioAgendamentoTypeOrmRepositoryAdapter
  implements ICalendarioAgendamentoRepository, ICalendarioAgendamentoJunctionRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  // ============================================================================
  // ICalendarioAgendamentoRepository
  // ============================================================================

  async findEventos(
    options?: ICalendarioAgendamentoFindEventosOptions,
  ): Promise<CalendarioAgendamentoEntity[]> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    const qb = repo
      .createQueryBuilder("ca")
      .where("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.EVENTO })
      .orderBy("ca.data_inicio", "ASC");

    if (options?.search) {
      qb.andWhere("ca.nome ILIKE :search", { search: `%${options.search}%` });
    }

    if (options?.filterTurmaId) {
      qb.innerJoin(
        CalendarioAgendamentoTurmaEntity,
        "cat",
        "cat.id_calendario_agendamento_fk = ca.id",
      ).andWhere("cat.id_turma_fk = :filterTurmaId", { filterTurmaId: options.filterTurmaId });
    }

    if (options?.filterOfertaFormacaoId) {
      qb.innerJoin(
        CalendarioAgendamentoOfertaFormacaoEntity,
        "caof",
        "caof.id_calendario_agendamento_fk = ca.id",
      ).andWhere("caof.id_oferta_formacao_fk = :filterOfertaFormacaoId", {
        filterOfertaFormacaoId: options.filterOfertaFormacaoId,
      });
    }

    return qb.getMany();
  }

  async findById(
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamentoEntity | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const where: Record<string, unknown> = { id };
    if (tipo !== undefined) {
      where.tipo = tipo;
    }
    return repo.findOneBy(where as any);
  }

  async save(entity: CalendarioAgendamentoEntity): Promise<CalendarioAgendamentoEntity> {
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    return repo.save(entity);
  }

  // ============================================================================
  // ICalendarioAgendamentoJunctionRepository
  // cross-module: uses TypeORM directly for sibling junction entities
  // (CalendarioAgendamentoTurmaEntity, CalendarioAgendamentoProfessorEntity, etc.)
  // This is intentional: this adapter is the designated central junction manager.
  // ============================================================================

  async findJunctions(eventoId: string): Promise<ICalendarioAgendamentoJunctionData> {
    const [turmaJunctions, profJunctions, clJunctions, ofJunctions, modJunctions] =
      await Promise.all([
        this.appTypeormConnection
          .getRepository(CalendarioAgendamentoTurmaEntity)
          .find({ where: { idCalendarioAgendamentoFk: eventoId } }),
        this.appTypeormConnection
          .getRepository(CalendarioAgendamentoProfessorEntity)
          .find({ where: { idCalendarioAgendamentoFk: eventoId } }),
        this.appTypeormConnection
          .getRepository(CalendarioAgendamentoCalendarioLetivoEntity)
          .find({ where: { idCalendarioAgendamentoFk: eventoId } }),
        this.appTypeormConnection
          .getRepository(CalendarioAgendamentoOfertaFormacaoEntity)
          .find({ where: { idCalendarioAgendamentoFk: eventoId } }),
        this.appTypeormConnection
          .getRepository(CalendarioAgendamentoModalidadeEntity)
          .find({ where: { idCalendarioAgendamentoFk: eventoId } }),
      ]);

    return {
      turmaIds: turmaJunctions.map((j) => j.idTurmaFk),
      perfilIds: profJunctions.map((j) => j.idPerfilFk),
      calendarioLetivoIds: clJunctions.map((j) => j.idCalendarioLetivoFk),
      ofertaFormacaoIds: ofJunctions.map((j) => j.idOfertaFormacaoFk),
      modalidadeIds: modJunctions.map((j) => j.idModalidadeFk),
    };
  }

  async syncJunctions(
    eventoId: string,
    data: ICalendarioAgendamentoJunctionSyncData,
  ): Promise<void> {
    if (data.turmaIds !== undefined) {
      const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);
      await repo.delete({ idCalendarioAgendamentoFk: eventoId });
      for (const turmaId of data.turmaIds) {
        const j = new CalendarioAgendamentoTurmaEntity();
        j.id = generateUuidV7();
        j.idTurmaFk = turmaId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).turma = { id: turmaId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await repo.save(j);
      }
    }

    if (data.perfilIds !== undefined) {
      const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoProfessorEntity);
      await repo.delete({ idCalendarioAgendamentoFk: eventoId });
      for (const perfilId of data.perfilIds) {
        const j = new CalendarioAgendamentoProfessorEntity();
        j.id = generateUuidV7();
        j.idPerfilFk = perfilId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).perfil = { id: perfilId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await repo.save(j);
      }
    }

    if (data.calendarioLetivoIds !== undefined) {
      const repo = this.appTypeormConnection.getRepository(
        CalendarioAgendamentoCalendarioLetivoEntity,
      );
      await repo.delete({ idCalendarioAgendamentoFk: eventoId });
      for (const clId of data.calendarioLetivoIds) {
        const j = new CalendarioAgendamentoCalendarioLetivoEntity();
        j.id = generateUuidV7();
        j.idCalendarioLetivoFk = clId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).calendarioLetivo = { id: clId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await repo.save(j);
      }
    }

    if (data.ofertaFormacaoIds !== undefined) {
      const repo = this.appTypeormConnection.getRepository(
        CalendarioAgendamentoOfertaFormacaoEntity,
      );
      await repo.delete({ idCalendarioAgendamentoFk: eventoId });
      for (const ofId of data.ofertaFormacaoIds) {
        const j = new CalendarioAgendamentoOfertaFormacaoEntity();
        j.id = generateUuidV7();
        j.idOfertaFormacaoFk = ofId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).ofertaFormacao = { id: ofId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await repo.save(j);
      }
    }

    if (data.modalidadeIds !== undefined) {
      const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoModalidadeEntity);
      await repo.delete({ idCalendarioAgendamentoFk: eventoId });
      for (const modId of data.modalidadeIds) {
        const j = new CalendarioAgendamentoModalidadeEntity();
        j.id = generateUuidV7();
        j.idModalidadeFk = modId;
        j.idCalendarioAgendamentoFk = eventoId;
        (j as any).modalidade = { id: modId };
        (j as any).calendarioAgendamento = { id: eventoId };
        await repo.save(j);
      }
    }
  }
}
