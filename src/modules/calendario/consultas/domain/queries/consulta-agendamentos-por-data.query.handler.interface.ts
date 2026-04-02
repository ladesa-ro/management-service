import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import type { ConsultaAgendamentosPorDataQuery } from "./consulta-agendamentos-por-data.query";

export const ConsultaAgendamentosPorDataQueryMetadata = createOperationMetadata({
  operationId: "consultaAgendamentosPorData",
  summary: "Consulta agendamentos por período",
});

export const IConsultaAgendamentosPorDataQueryHandler = Symbol(
  "IConsultaAgendamentosPorDataQueryHandler",
);

export interface IConsultaAgendamentosPorDataQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: ConsultaAgendamentosPorDataQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]>;
}
