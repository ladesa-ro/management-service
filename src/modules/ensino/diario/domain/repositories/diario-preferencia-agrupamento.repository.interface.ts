import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositorySoftDeleteById,
  PersistInput,
} from "@/domain/abstractions";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario";
import type {
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../queries";

export const IDiarioPreferenciaAgrupamentoRepository = Symbol(
  "IDiarioPreferenciaAgrupamentoRepository",
);

export interface IDiarioPreferenciaAgrupamentoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Cria o registro e retorna o ID gerado. */
  create(
    data: Partial<PersistInput<IDiarioPreferenciaAgrupamento>>,
  ): Promise<{ id: string | number }>;

  /** Atualiza campos do registro por ID. */
  update(
    id: string | number,
    data: Partial<PersistInput<IDiarioPreferenciaAgrupamento>>,
  ): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Soft-delete de todas as preferências de agrupamento de um diário. */
  softDeleteByDiarioId(diarioId: string): Promise<void>;

  /** Cria múltiplos registros em lote. */
  bulkCreate(
    entries: Array<{
      diarioId: string;
      dataInicio: string;
      dataFim?: string | null;
      diaSemanaIso: number;
      aulasSeguidas: number;
    }>,
  ): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    DiarioPreferenciaAgrupamentoFindOneQuery,
    DiarioPreferenciaAgrupamentoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    DiarioPreferenciaAgrupamentoListQuery,
    DiarioPreferenciaAgrupamentoListQueryResult
  >;
}
