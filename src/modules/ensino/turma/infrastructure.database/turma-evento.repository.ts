import type { FindOptionsWhere } from "typeorm";
import { ensureExists } from "@/application/errors";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { CalendarioAgendamento } from "@/modules/calendario/agendamento/domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import { CalendarioAgendamentoMetadata } from "@/modules/calendario/agendamento/domain/calendario-agendamento-metadata";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
} from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
import type { ITurmaEventoRepository } from "../domain/repositories";

@Impl()
export class TurmaEventoTypeOrmRepositoryAdapter implements ITurmaEventoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    @Dep(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
  ) {}

  // cross-module: uses TypeORM directly for junction query (CalendarioAgendamentoTurmaEntity)
  async findEventosByTurmaId(turmaId: string): Promise<CalendarioAgendamentoEntity[]> {
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);

    const junctions = await junctionRepo.find({
      where: { turma: { id: turmaId } },
      relations: ["calendarioAgendamento"],
    });

    return junctions
      .filter((j) => j.calendarioAgendamento?.status !== CalendarioAgendamentoStatus.INATIVO)
      .map((j) => j.calendarioAgendamento);
  }

  async createEvento(
    turmaId: string,
    data: {
      nome: string | null;
      dataInicio: string;
      dataFim: string | null;
      diaInteiro: boolean;
      horarioInicio: string;
      horarioFim: string;
      cor: string | null;
      repeticao: string | null;
    },
  ): Promise<CalendarioAgendamentoEntity> {
    const domain = CalendarioAgendamento.create({
      tipo: CalendarioAgendamentoTipo.EVENTO,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      diaInteiro: data.diaInteiro,
      horarioInicio: data.horarioInicio,
      horarioFim: data.horarioFim,
      repeticao: data.repeticao,
      turmas: [{ id: turmaId }],
    });

    await this.calendarioAgendamentoRepository.save(domain);

    // Metadata (nome/cor) na tabela separada
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: domain.identificadorExterno,
      nome: data.nome,
      cor: data.cor,
    });
    await this.calendarioAgendamentoRepository.saveMetadata(metadata);

    // Retorna entity para compatibilidade com callers existentes
    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const entity = await repo.findOneBy({ id: domain.id });
    ensureExists(entity, CalendarioAgendamento.entityName, domain.id);
    return entity;
  }

  async updateEvento(
    eventoId: string,
    data: {
      nome?: string;
      dataInicio?: string;
      dataFim?: string | null;
      diaInteiro?: boolean;
      horarioInicio?: string;
      horarioFim?: string;
      cor?: string | null;
      repeticao?: string | null;
    },
  ): Promise<CalendarioAgendamentoEntity> {
    const domain = await this.calendarioAgendamentoRepository.loadById(null, eventoId);
    ensureExists(domain, "TurmaEvento", eventoId);

    // Metadata (nome/cor) — atualizar sem gerar nova versao
    if (data.nome !== undefined || data.cor !== undefined) {
      await this.calendarioAgendamentoRepository.updateMetadata(domain.identificadorExterno, {
        nome: data.nome,
        cor: data.cor,
      });
    }

    // Campos versionados — gerar nova versao
    const hasVersioned =
      data.dataInicio !== undefined ||
      data.dataFim !== undefined ||
      data.diaInteiro !== undefined ||
      data.horarioInicio !== undefined ||
      data.horarioFim !== undefined ||
      data.repeticao !== undefined;

    let resultId = eventoId;

    if (hasVersioned) {
      domain.close();
      const newVersion = CalendarioAgendamento.createNewVersion(domain, {
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
        diaInteiro: data.diaInteiro,
        horarioInicio: data.horarioInicio,
        horarioFim: data.horarioFim,
        repeticao: data.repeticao,
      });
      await this.calendarioAgendamentoRepository.saveNewVersion(domain, newVersion);
      resultId = newVersion.id;
    }

    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const entity = await repo.findOneBy({ id: resultId });
    ensureExists(entity, CalendarioAgendamento.entityName, resultId);
    return entity;
  }

  // cross-module: uses TypeORM directly for junction delete (CalendarioAgendamentoTurmaEntity)
  async deleteEventoForTurma(eventoId: string, turmaId: string): Promise<void> {
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);

    await junctionRepo.delete({
      turma: { id: turmaId },
      calendarioAgendamento: { id: eventoId },
    } as FindOptionsWhere<CalendarioAgendamentoTurmaEntity>);
  }
}
