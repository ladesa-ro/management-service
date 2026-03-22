import type { IRepositoryFindAll, IRepositoryFindById } from "@/domain/abstractions";
import { CidadeFindOneQueryResult, CidadeListQueryResult } from "@/modules/localidades/cidade";

/**
 * Token de injeção para o repositório de Cidade
 */
export const ICidadeRepository = Symbol("ICidadeRepository");

/**
 * Port de saída para operações de persistência de Cidade (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export type ICidadeRepository = IRepositoryFindAll<CidadeListQueryResult> &
  IRepositoryFindById<CidadeFindOneQueryResult>;
