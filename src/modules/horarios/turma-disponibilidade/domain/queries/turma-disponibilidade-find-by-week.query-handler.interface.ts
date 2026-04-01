import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaDisponibilidadeConfiguracao } from "../turma-disponibilidade";
import type { TurmaDisponibilidadeFindByWeekQuery } from "./turma-disponibilidade-find-by-week.query";

export const TurmaDisponibilidadeFindByWeekQueryMetadata = createOperationMetadata({
  operationId: "turmaDisponibilidadeFindByWeek",
  summary: "Consulta disponibilidade da turma para uma semana",
});

export const ITurmaDisponibilidadeFindByWeekQueryHandler = Symbol(
  "ITurmaDisponibilidadeFindByWeekQueryHandler",
);

export type ITurmaDisponibilidadeFindByWeekQueryHandler = IQueryHandler<
  TurmaDisponibilidadeFindByWeekQuery,
  TurmaDisponibilidadeConfiguracao | null
>;
