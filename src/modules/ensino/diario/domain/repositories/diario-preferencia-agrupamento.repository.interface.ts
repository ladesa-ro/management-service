import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario";
import type {
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../queries";

export const IDiarioPreferenciaAgrupamentoRepository = Symbol(
  "IDiarioPreferenciaAgrupamentoRepository",
);

export type IDiarioPreferenciaAgrupamentoRepository =
  IRepositoryFindAll<DiarioPreferenciaAgrupamentoListQueryResult> &
    IRepositoryFindById<DiarioPreferenciaAgrupamentoFindOneQueryResult> &
    IRepositoryFindByIdSimple<DiarioPreferenciaAgrupamentoFindOneQueryResult> &
    IRepositoryCreate<IDiarioPreferenciaAgrupamento> &
    IRepositoryUpdate<IDiarioPreferenciaAgrupamento> &
    IRepositorySoftDelete & {
      softDeleteByDiarioId(diarioId: string): Promise<void>;

      bulkCreate(
        entries: Array<{
          diarioId: string;
          dataInicio: string;
          dataFim?: string | null;
          diaSemanaIso: number;
          aulasSeguidas: number;
        }>,
      ): Promise<void>;
    };
