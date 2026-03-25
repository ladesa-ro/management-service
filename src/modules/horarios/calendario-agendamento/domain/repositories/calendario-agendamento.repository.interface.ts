import type { IAccessContext } from "@/domain/abstractions";
import type { CalendarioAgendamento } from "../calendario-agendamento";
import type { CalendarioAgendamentoTipo } from "../calendario-agendamento.types";
import type { CalendarioAgendamentoFindEventosQuery } from "../queries/calendario-agendamento-find-eventos.query.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";

/**
 * Token de injecao para o repositorio de CalendarioAgendamento
 */
export const ICalendarioAgendamentoRepository = Symbol("ICalendarioAgendamentoRepository");

/**
 * Port de saida para operacoes de persistencia de CalendarioAgendamento.
 *
 * Unifica write side (aggregate) e read side (query results).
 * Junções são gerenciadas atomicamente dentro do save().
 */
export interface ICalendarioAgendamentoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById(
    accessContext: IAccessContext | null,
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamento | null>;

  /** Persiste o aggregate (create ou update), incluindo junções. */
  save(aggregate: CalendarioAgendamento): Promise<void>;

  /** Inativa o agendamento por ID. */
  inactivateById(id: string): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com junções para exibição. */
  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null>;

  /** Lista eventos com filtros. */
  getFindEventosQueryResult(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoFindEventosQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]>;
}
