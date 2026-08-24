import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";

export const CalendarioAgendamentoCancelarOcorrenciaCommandFields = {
  dataOcorrencia: CalendarioAgendamentoFields.dataOcorrencia,
  motivo: CalendarioAgendamentoFields.motivo,
};

export class CalendarioAgendamentoCancelarOcorrenciaCommand {
  ifMatch?: string;

  dataOcorrencia!: string;
  motivo?: string | null;
}
