import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { ICalendarioAgendamentoRepository } from "@/modules/horarios/calendario-agendamento/domain/repositories/calendario-agendamento.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "@/modules/horarios/calendario-agendamento-turma/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
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
      where: { idTurmaFk: turmaId },
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
    const evento = new CalendarioAgendamentoEntity();
    evento.id = generateUuidV7();
    evento.tipo = CalendarioAgendamentoTipo.EVENTO;
    evento.nome = data.nome;
    evento.dataInicio = data.dataInicio;
    evento.dataFim = data.dataFim;
    evento.diaInteiro = data.diaInteiro;
    evento.horarioInicio = data.horarioInicio;
    evento.horarioFim = data.horarioFim;
    evento.cor = data.cor;
    evento.repeticao = data.repeticao;
    evento.status = CalendarioAgendamentoStatus.ATIVO;
    await this.calendarioAgendamentoRepository.save(evento);

    // cross-module: uses TypeORM directly for junction entity (CalendarioAgendamentoTurmaEntity)
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);
    const junction = new CalendarioAgendamentoTurmaEntity();
    junction.id = generateUuidV7();
    junction.idTurmaFk = turmaId;
    junction.idCalendarioAgendamentoFk = evento.id;
    junction.turma = { id: turmaId } as CalendarioAgendamentoTurmaEntity["turma"];
    junction.calendarioAgendamento = {
      id: evento.id,
    } as CalendarioAgendamentoTurmaEntity["calendarioAgendamento"];
    await junctionRepo.save(junction);

    return evento;
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
    const entity = await this.calendarioAgendamentoRepository.findById(eventoId);
    ensureExists(entity, "TurmaEvento", eventoId);

    if (data.nome !== undefined) entity!.nome = data.nome;
    if (data.dataInicio !== undefined) entity!.dataInicio = new Date(data.dataInicio);
    if (data.dataFim !== undefined) entity!.dataFim = data.dataFim ? new Date(data.dataFim) : null;
    if (data.diaInteiro !== undefined) entity!.diaInteiro = data.diaInteiro;
    if (data.horarioInicio !== undefined) entity!.horarioInicio = data.horarioInicio;
    if (data.horarioFim !== undefined) entity!.horarioFim = data.horarioFim;
    if (data.cor !== undefined) entity!.cor = data.cor ?? null;
    if (data.repeticao !== undefined) entity!.repeticao = data.repeticao ?? null;

    await this.calendarioAgendamentoRepository.save(entity!);
    return entity!;
  }

  // cross-module: uses TypeORM directly for junction delete (CalendarioAgendamentoTurmaEntity)
  async deleteEventoForTurma(eventoId: string, turmaId: string): Promise<void> {
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);

    await junctionRepo.delete({
      idTurmaFk: turmaId,
      idCalendarioAgendamentoFk: eventoId,
    });
  }
}
