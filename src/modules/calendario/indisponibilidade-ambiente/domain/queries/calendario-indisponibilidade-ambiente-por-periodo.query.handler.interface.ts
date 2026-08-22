import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbienteFindOneQueryResult } from "./calendario-indisponibilidade-ambiente-find-one.query.result";
import type { CalendarioIndisponibilidadeAmbientePorPeriodoQuery } from "./calendario-indisponibilidade-ambiente-por-periodo.query";

export const CalendarioIndisponibilidadeAmbientePorPeriodoQueryMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeAmbientePorPeriodo",
  summary:
    "Lista indisponibilidades de um ambiente aplicáveis a um período: regras semanais (sempre) e exceções pontuais (quando a data cai no período)",
});

export const ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler = Symbol(
  "ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler",
);

export interface ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: CalendarioIndisponibilidadeAmbientePorPeriodoQuery,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult[]>;
}
