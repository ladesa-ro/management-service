import type { IBaseCrudRepository } from "@/domain/abstractions";
import type { ITurma } from "@/modules/ensino/turma";
import type { TurmaFindOneQueryResult, TurmaListQueryResult } from "../queries";
/**
 * Token de injeção para o repositório de Turma
 */
export const ITurmaRepository = Symbol("ITurmaRepository");

/**
 * Port de saída para operações de persistência de Turma
 * Estende a interface base de CRUD com operações padrão
 */
export interface ITurmaRepository
  extends IBaseCrudRepository<ITurma, TurmaListQueryResult, TurmaFindOneQueryResult> {}
