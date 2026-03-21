import type {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";

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
  ): Promise<CalendarioAgendamentoEntity[]>;
  findById(
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamentoEntity | null>;
  save(entity: CalendarioAgendamentoEntity): Promise<CalendarioAgendamentoEntity>;
}
