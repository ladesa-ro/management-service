import type { CalendarioAgendamentoEntity } from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

export const ITurmaEventoRepository = Symbol("ITurmaEventoRepository");

export interface ITurmaEventoRepository {
  findEventosByTurmaId(turmaId: string): Promise<CalendarioAgendamentoEntity[]>;

  createEvento(
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
  ): Promise<CalendarioAgendamentoEntity>;

  updateEvento(
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
  ): Promise<CalendarioAgendamentoEntity>;

  deleteEventoForTurma(eventoId: string, turmaId: string): Promise<void>;
}
