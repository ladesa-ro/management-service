import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaDisponibilidadeConfiguracao } from "../turma-disponibilidade";
import type { TurmaDisponibilidadeFindAllActiveQuery } from "./turma-disponibilidade-find-all-active.query";

export const TurmaDisponibilidadeFindAllActiveQueryMetadata = createOperationMetadata({
  operationId: "turmaDisponibilidadeFindAllActive",
  summary: "Lista todas as configuracoes ativas de disponibilidade da turma",
});

export const ITurmaDisponibilidadeFindAllActiveQueryHandler = Symbol(
  "ITurmaDisponibilidadeFindAllActiveQueryHandler",
);

export type ITurmaDisponibilidadeFindAllActiveQueryHandler = IQueryHandler<
  TurmaDisponibilidadeFindAllActiveQuery,
  TurmaDisponibilidadeConfiguracao[]
>;
