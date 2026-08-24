import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "./calendario-indisponibilidade-professor-find-one.query.result";
import type { CalendarioIndisponibilidadeProfessorPorPeriodoQuery } from "./calendario-indisponibilidade-professor-por-periodo.query";

export const CalendarioIndisponibilidadeProfessorPorPeriodoQueryMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeProfessorPorPeriodo",
  summary:
    "Lista indisponibilidades de um professor aplicáveis a um período: regras semanais (sempre) e exceções pontuais (quando a data cai no período)",
});

export const ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler = Symbol(
  "ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler",
);

export interface ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: CalendarioIndisponibilidadeProfessorPorPeriodoQuery,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult[]>;
}
