/**
 * Token de injecao para o repositorio de juncoes de CalendarioAgendamento
 */
export const ICalendarioAgendamentoJunctionRepository = Symbol(
  "ICalendarioAgendamentoJunctionRepository",
);

export interface ICalendarioAgendamentoJunctionData {
  turmaIds: string[];
  perfilIds: string[];
  calendarioLetivoIds: string[];
  ofertaFormacaoIds: string[];
  modalidadeIds: string[];
}

export interface ICalendarioAgendamentoJunctionSyncData {
  turmaIds?: string[];
  perfilIds?: string[];
  calendarioLetivoIds?: string[];
  ofertaFormacaoIds?: string[];
  modalidadeIds?: string[];
}

/**
 * Port de saida para operacoes de persistencia das juncoes de CalendarioAgendamento
 */
export interface ICalendarioAgendamentoJunctionRepository {
  findJunctions(eventoId: string): Promise<ICalendarioAgendamentoJunctionData>;
  syncJunctions(eventoId: string, data: ICalendarioAgendamentoJunctionSyncData): Promise<void>;
}
