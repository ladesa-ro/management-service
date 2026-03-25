import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import type {
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoListQueryResult,
} from "../queries";

export const IOfertaFormacaoRepository = Symbol("IOfertaFormacaoRepository");

/**
 * Port de saída para operações de persistência de OfertaFormacao.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface IOfertaFormacaoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<OfertaFormacao>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<OfertaFormacao>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    OfertaFormacaoFindOneQuery,
    OfertaFormacaoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    OfertaFormacaoListQuery,
    OfertaFormacaoListQueryResult
  >;
}
