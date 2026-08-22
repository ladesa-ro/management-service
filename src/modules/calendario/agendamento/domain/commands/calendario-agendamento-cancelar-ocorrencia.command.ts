import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";

export const CalendarioAgendamentoCancelarOcorrenciaCommandFields = {
  dataOcorrencia: CalendarioAgendamentoFields.dataOcorrencia,
  motivo: CalendarioAgendamentoFields.motivo,
};

/**
 * Cancela uma única ocorrência de uma série recorrente (EXDATE): cria uma
 * exceção com status INATIVO para a data indicada. A série raiz não é alterada.
 */
export class CalendarioAgendamentoCancelarOcorrenciaCommand {
  ifMatch?: string;

  dataOcorrencia!: string;
  motivo?: string | null;
}
