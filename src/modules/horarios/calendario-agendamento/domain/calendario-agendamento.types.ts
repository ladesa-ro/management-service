export enum CalendarioAgendamentoTipo {
  INDISPONIBILIDADE = "INDISPONIBILIDADE",
  AULA = "AULA",
  EVENTO = "EVENTO",
  RESERVA = "RESERVA",
}

export enum CalendarioAgendamentoStatus {
  RASCUNHO = "RASCUNHO",
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

export interface ICalendarioAgendamento {
  id: string;
  tipo: CalendarioAgendamentoTipo;
  dataInicio: Date;
  dataFim: Date | null;
  diaInteiro: boolean;
  horarioInicio: string;
  horarioFim: string;
  repeticao: string | null;
  nome: string | null;
  cor: string | null;
  status: CalendarioAgendamentoStatus | null;
}
