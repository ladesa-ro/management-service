import type {
  CalendarioAgendamentoTipo,
  ICalendarioAgendamento,
} from "../calendario-agendamento.types";

/**
 * Token de injecao para o repositorio de CalendarioAgendamento
 */
export const ICalendarioAgendamentoRepository = Symbol("ICalendarioAgendamentoRepository");

export interface ICalendarioAgendamentoFindEventosOptions {
  search?: string;
  filterTurmaId?: string;
  filterOfertaFormacaoId?: string;
}

/**
 * Port de saida para operacoes de persistencia de CalendarioAgendamento
 */
export interface ICalendarioAgendamentoRepository {
  findEventos(
    options?: ICalendarioAgendamentoFindEventosOptions,
  ): Promise<ICalendarioAgendamento[]>;
  findById(id: string, tipo?: CalendarioAgendamentoTipo): Promise<ICalendarioAgendamento | null>;
  save(entity: Partial<ICalendarioAgendamento>): Promise<ICalendarioAgendamento>;
}
