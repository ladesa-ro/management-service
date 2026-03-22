import type { ICalendarioAgendamento } from "@/modules/horarios/calendario-agendamento/domain/calendario-agendamento.types";

export const ITurmaEventoRepository = Symbol("ITurmaEventoRepository");

export interface ITurmaEventoRepository {
  findEventosByTurmaId(turmaId: string): Promise<ICalendarioAgendamento[]>;

  createEvento(
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
  ): Promise<ICalendarioAgendamento>;

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
  ): Promise<ICalendarioAgendamento>;

  deleteEventoForTurma(eventoId: string, turmaId: string): Promise<void>;
}
