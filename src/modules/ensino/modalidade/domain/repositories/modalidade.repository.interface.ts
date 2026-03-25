import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type {
  ModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeListQueryResult,
} from "../queries";

export const IModalidadeRepository = Symbol("IModalidadeRepository");

/**
 * Port de saida para operacoes de persistencia de Modalidade.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de dominio reconstituido.
 * O read side retorna dados hidratados para exibicao (query results).
 */
export interface IModalidadeRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<Modalidade>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Modalidade>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    ModalidadeFindOneQuery,
    ModalidadeFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    ModalidadeListQuery,
    ModalidadeListQueryResult
  >;
}
