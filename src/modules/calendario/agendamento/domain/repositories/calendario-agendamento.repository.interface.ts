import type { IAccessContext } from "@/domain/abstractions";
import type { CalendarioAgendamento } from "../calendario-agendamento";
import type { CalendarioAgendamentoTipo } from "../calendario-agendamento.types";
import type { CalendarioAgendamentoMetadata } from "../calendario-agendamento-metadata";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoListQuery } from "../queries/calendario-agendamento-list.query";
import type { CalendarioAgendamentoListQueryResult } from "../queries/calendario-agendamento-list.query.result";

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

  /** Persiste o aggregate (create), incluindo junções. */
  save(aggregate: CalendarioAgendamento): Promise<void>;

  /**
   * Persiste uma nova versao: encerra a versao anterior e cria a nova com junctions.
   * Junctions da versao anterior NAO sao removidas (historico imutavel).
   */
  saveNewVersion(
    closedVersion: CalendarioAgendamento,
    newVersion: CalendarioAgendamento,
  ): Promise<void>;

  /** Encerra a versao atual (seta valid_to). */
  closeVersion(aggregate: CalendarioAgendamento): Promise<void>;

  // ==========================================
  // Metadata — campos nao-versionados
  // ==========================================

  /** Persiste metadata para um novo agendamento. */
  saveMetadata(metadata: CalendarioAgendamentoMetadata): Promise<void>;

  /** Atualiza metadata (nome/cor) de um agendamento existente. */
  updateMetadata(
    identificadorExterno: string,
    fields: { nome?: string | null; cor?: string | null },
  ): Promise<void>;

  /** Carrega metadata por identificador externo. */
  loadMetadata(identificadorExterno: string): Promise<CalendarioAgendamentoMetadata | null>;

  // ==========================================
  // Junction operations
  // ==========================================

  /** Remove a juncao entre um agendamento e uma turma. */
  deleteTurmaJunction(agendamentoId: string, turmaId: string): Promise<void>;

  /** Remove a juncao entre um agendamento e um perfil. */
  deletePerfilJunction(agendamentoId: string, perfilId: string): Promise<void>;

  // ==========================================
  // Direct field updates
  // ==========================================

  /** Atualiza o status de um agendamento diretamente. */
  updateStatus(id: string, status: string): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com junções para exibição. */
  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    id: string,
    tipo?: CalendarioAgendamentoTipo,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null>;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoListQuery | null,
  ): Promise<CalendarioAgendamentoListQueryResult>;

  /** Busca agendamentos que se sobrepõem a um período, com filtros opcionais. */
  findByDateRange(query: {
    dateStart: string;
    dateEnd: string;
    campus?: string;
    turma?: string;
    professor?: string;
    tipo?: CalendarioAgendamentoTipo;
  }): Promise<CalendarioAgendamentoFindOneQueryResult[]>;
}
