import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type {
  RelatorioFindOneQuery,
  RelatorioFindOneQueryResult,
  RelatorioListQuery,
  RelatorioListQueryResult,
} from "../queries";
import type { Relatorio } from "../relatorio";

export const IRelatorioEstagioRepository = Symbol("IRelatorioEstagioRepository");

/**
 * Port de saída para persistência de Relatório de Estágio.
 */
export interface IRelatorioEstagioRepository {
  // ==========================================
  // Write side
  // ==========================================

  loadById: IRepositoryLoadById<Relatorio>;
  findByEstagioId(estagioId: string): Promise<Relatorio | null>;
  save: IRepositorySave<Relatorio>;
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    RelatorioFindOneQuery,
    RelatorioFindOneQueryResult
  >;
  getFindByEstagioQueryResult(estagioId: string): Promise<RelatorioFindOneQueryResult | null>;
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    RelatorioListQuery,
    RelatorioListQueryResult
  >;
}
