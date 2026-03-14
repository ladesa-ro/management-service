import type { IBaseCrudRepository } from "@/modules/@shared";
import type { IDisciplina } from "@/modules/ensino/disciplina";
import type { DisciplinaFindOneQueryResult, DisciplinaListQueryResult } from "../queries";
/**
 * Token de injeção para o repositório de Disciplina
 */
export const IDisciplinaRepository = Symbol("IDisciplinaRepository");

/**
 * Port de saída para operações de persistência de Disciplina
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisciplinaRepository
  extends IBaseCrudRepository<
    IDisciplina,
    DisciplinaListQueryResult,
    DisciplinaFindOneQueryResult
  > {}
