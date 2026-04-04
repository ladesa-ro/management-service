import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type {
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteListQueryResult,
} from "../queries";

export const IAmbienteRepository = Symbol("IAmbienteRepository");

/**
 * Port de saída para operações de persistência de Ambiente.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */

export interface IAmbienteRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Ambiente>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Ambiente>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Atualiza a FK de um campo de imagem por ID. */
  updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    AmbienteFindOneQuery,
    AmbienteFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    AmbienteListQuery,
    AmbienteListQueryResult
  >;
}
