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

/**
 * Escopo de uma edição de série recorrente, equivalente à escolha que apps de
 * calendário (Google, Outlook) apresentam ao editar um evento repetido.
 */
export enum CalendarioAgendamentoEscopoEdicaoSerie {
  ESTA_E_SEGUINTES = "ESTA_E_SEGUINTES",
  TODAS = "TODAS",
}
