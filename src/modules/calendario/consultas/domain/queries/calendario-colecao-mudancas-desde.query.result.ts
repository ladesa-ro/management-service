import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";

export class CalendarioColecaoMudancasDesdeQueryResult {
  syncToken!: number;

  agendamentos!: CalendarioAgendamentoFindOneQueryResult[];
}
