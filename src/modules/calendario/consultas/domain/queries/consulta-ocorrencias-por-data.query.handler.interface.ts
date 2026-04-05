import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import type { ConsultaOcorrenciasPorDataQuery } from "./consulta-ocorrencias-por-data.query";

export const ConsultaOcorrenciasPorDataQueryMetadata = createOperationMetadata({
  operationId: "consultaOcorrenciasPorData",
  summary: "Consulta ocorrências por período",
});

export const IConsultaOcorrenciasPorDataQueryHandler = Symbol(
  "IConsultaOcorrenciasPorDataQueryHandler",
);

export interface IConsultaOcorrenciasPorDataQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: ConsultaOcorrenciasPorDataQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]>;
}
