import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
} from "@/domain/abstractions";
import type {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
  CidadeListQueryResult,
} from "@/modules/localidades/cidade";

/**
 * Token de injeção para o repositório de Cidade
 */

export const ICidadeRepository = Symbol("ICidadeRepository");

/**
 * Port de saída para operações de consulta de Cidade (read-only).
 */

export interface ICidadeRepository {
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CidadeFindOneQuery,
    CidadeFindOneQueryResult
  >;
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<CidadeListQuery, CidadeListQueryResult>;
}
