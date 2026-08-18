import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { FolhaPonto } from "../folha-ponto";
import type {
  FolhaPontoFindOneQuery,
  FolhaPontoFindOneQueryResult,
  FolhaPontoListQuery,
  FolhaPontoListQueryResult,
} from "../queries";

export const IFolhaPontoRepository = Symbol("IFolhaPontoRepository");

/**
 * Port de saída para operações de persistência de FolhaPonto.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface IFolhaPontoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<FolhaPonto>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<FolhaPonto>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /**
   * Verifica se já existe uma folha de ponto ativa para o estágio + data.
   * @param excludeId - ID opcional para exclusão (usado em updates — não aplicável aqui)
   */
  existsByEstagioAndData(estagioId: string, data: string, excludeId?: string): Promise<boolean>;

  /**
   * Retorna todas as folhas PENDING cuja data_solicitacao + ttlHours < agora.
   * Usado pelo CronJob de expiração.
   */
  findExpiredPending(ttlHours: number): Promise<FolhaPonto[]>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    FolhaPontoFindOneQuery,
    FolhaPontoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    FolhaPontoListQuery,
    FolhaPontoListQueryResult
  >;
}
