import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessorFindOneQuery } from "./calendario-indisponibilidade-professor-find-one.query";
import type { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "./calendario-indisponibilidade-professor-find-one.query.result";

export const CalendarioIndisponibilidadeProfessorFindOneQueryMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeProfessorFindOneById",
  summary: "Busca uma indisponibilidade de professor por ID",
});

export const ICalendarioIndisponibilidadeProfessorFindOneQueryHandler = Symbol(
  "ICalendarioIndisponibilidadeProfessorFindOneQueryHandler",
);

export type ICalendarioIndisponibilidadeProfessorFindOneQueryHandler = IQueryHandler<
  CalendarioIndisponibilidadeProfessorFindOneQuery,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult | null
>;
