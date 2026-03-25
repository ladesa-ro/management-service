import type { FindOptionsWhere } from "typeorm";
import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { CalendarioAgendamento } from "@/modules/horarios/calendario-agendamento/domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "@/modules/horarios/calendario-agendamento/domain/calendario-agendamento.types";
import { ICalendarioAgendamentoRepository } from "@/modules/horarios/calendario-agendamento/domain/repositories/calendario-agendamento.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
import type { ITurmaEventoRepository } from "../domain/repositories";

@DeclareImplementation()
export class TurmaEventoTypeOrmRepositoryAdapter implements ITurmaEventoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    @DeclareDependency(ICalendarioAgendamentoRepository)
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
      dataInicio: Date;
      dataFim: Date | null;
      diaInteiro: boolean;
      horarioInicio: string;
      horarioFim: string;
      cor: string | null;
      repeticao: string | null;
    },
  ): Promise<CalendarioAgendamentoEntity> {
    const domain = CalendarioAgendamento.create({
      tipo: CalendarioAgendamentoTipo.EVENTO,
      nome: data.nome,
      dataInicio:
        data.dataInicio instanceof Date
          ? data.dataInicio.toISOString().split("T")[0]
          : String(data.dataInicio),
      dataFim: data.dataFim
        ? data.dataFim instanceof Date
          ? data.dataFim.toISOString().split("T")[0]
          : String(data.dataFim)
        : null,
      diaInteiro: data.diaInteiro,
      horarioInicio: data.horarioInicio,
      horarioFim: data.horarioFim,
      cor: data.cor,
      repeticao: data.repeticao,
      turmaIds: [turmaId],
    });

    await this.calendarioAgendamentoRepository.save(domain);

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

    domain.update(data);

    await this.calendarioAgendamentoRepository.save(domain);

    const repo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const entity = await repo.findOneBy({ id: eventoId });
    ensureExists(entity, CalendarioAgendamento.entityName, eventoId);
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
