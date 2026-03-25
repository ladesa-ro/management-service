import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
} from "@/domain/abstractions";
import type {
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
  EstadoListQueryResult,
} from "@/modules/localidades/estado";

export const IEstadoRepository = Symbol("IEstadoRepository");

/**
 * Port de saída para operações de consulta de Estado (read-only).
 */
export interface IEstadoRepository {
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    EstadoFindOneQuery,
    EstadoFindOneQueryResult
  >;
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<EstadoListQuery, EstadoListQueryResult>;
}
