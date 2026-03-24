import type { IAccessContext } from "@/domain/abstractions";
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
  loadById(accessContext: IAccessContext | null, id: string): Promise<OfertaFormacao | null>;

  /** Persiste o aggregate (create ou update). */
  save(aggregate: OfertaFormacao): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById(id: string): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoFindOneQuery,
  ): Promise<OfertaFormacaoFindOneQueryResult | null>;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoListQuery | null,
  ): Promise<OfertaFormacaoListQueryResult>;
}
