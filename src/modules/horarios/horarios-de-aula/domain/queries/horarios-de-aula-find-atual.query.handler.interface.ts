import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { HorariosDeAulaFindAtualQuery } from "./horarios-de-aula-find-atual.query";
import type { HorariosDeAulaFindAtualQueryResult } from "./horarios-de-aula-find-atual.query.result";

export const HorariosDeAulaFindAtualQueryMetadata = createOperationMetadata({
  operationId: "horariosDeAulaFindAtual",
  summary: "Retorna os horarios de aula ativos de um campus",
});

export const IHorariosDeAulaFindAtualQueryHandler = Symbol("IHorariosDeAulaFindAtualQueryHandler");

export type IHorariosDeAulaFindAtualQueryHandler = IQueryHandler<
  HorariosDeAulaFindAtualQuery,
  HorariosDeAulaFindAtualQueryResult
>;
