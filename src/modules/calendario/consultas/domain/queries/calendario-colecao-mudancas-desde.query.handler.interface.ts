import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoMudancasDesdeQuery } from "./calendario-colecao-mudancas-desde.query";
import type { CalendarioColecaoMudancasDesdeQueryResult } from "./calendario-colecao-mudancas-desde.query.result";

export const CalendarioColecaoMudancasDesdeQueryMetadata = createOperationMetadata({
  operationId: "calendarioColecaoMudancasDesde",
  summary: "Consulta agendamentos de uma coleção mudados desde um marcador de sincronização",
});

export const ICalendarioColecaoMudancasDesdeQueryHandler = Symbol(
  "ICalendarioColecaoMudancasDesdeQueryHandler",
);

export interface ICalendarioColecaoMudancasDesdeQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: CalendarioColecaoMudancasDesdeQuery,
  ): Promise<CalendarioColecaoMudancasDesdeQueryResult>;
}
