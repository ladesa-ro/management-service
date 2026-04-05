import type { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";

export class ConsultaOcorrenciasPorDataQuery {
  dateStart!: string;
  dateEnd!: string;
  campus?: string;
  turma?: string;
  professor?: string;
  tipo?: CalendarioAgendamentoTipo;
}
