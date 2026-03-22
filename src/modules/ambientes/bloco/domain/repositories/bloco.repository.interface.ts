import type { IBaseCrudRepository } from "@/domain/abstractions";
import type {
  BlocoFindOneQueryResult,
  BlocoListQueryResult,
  IBloco,
} from "@/modules/ambientes/bloco";

/**
 * Token de injeção para o repositório de Bloco
 */
export const IBlocoRepository = Symbol("IBlocoRepository");

/**
 * Port de saída para operações de persistência de Bloco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IBlocoRepository
  extends IBaseCrudRepository<IBloco, BlocoListQueryResult, BlocoFindOneQueryResult> {}
