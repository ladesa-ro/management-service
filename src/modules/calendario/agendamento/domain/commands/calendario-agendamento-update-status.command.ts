import type { CalendarioAgendamentoStatus } from "../calendario-agendamento.types";

export class CalendarioAgendamentoUpdateStatusCommand {
  id!: string;
  status!: CalendarioAgendamentoStatus;
}
