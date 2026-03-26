import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type {
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoListQueryResult,
} from "../queries";

export const INivelFormacaoRepository = Symbol("INivelFormacaoRepository");

/**
 * Port de saída para operações de persistência de NivelFormacao.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */

export interface INivelFormacaoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<NivelFormacao>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<NivelFormacao>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    NivelFormacaoFindOneQuery,
    NivelFormacaoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    NivelFormacaoListQuery,
    NivelFormacaoListQueryResult
  >;
}
