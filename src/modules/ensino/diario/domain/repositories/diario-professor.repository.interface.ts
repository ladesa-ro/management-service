import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepository } from "@/modules/@shared";
import type { IDiarioProfessor } from "@/modules/ensino/diario";
import type { DiarioProfessorFindOneQueryResult, DiarioProfessorListQueryResult } from "../queries";
export const IDiarioProfessorRepository = Symbol("IDiarioProfessorRepository");

/**
 * Port de saída para operações de persistência de DiarioProfessor
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioProfessorRepository
  extends IBaseCrudRepository<
    IDiarioProfessor,
    DiarioProfessorListQueryResult,
    DiarioProfessorFindOneQueryResult
  > {
  /**
   * Busca um diário de professor por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ): Promise<DiarioProfessorFindOneQueryResult | null>;

  /**
   * Soft-delete todos os diário-professor de um diário
   */
  softDeleteByDiarioId(diarioId: string): Promise<void>;

  /**
   * Cria múltiplas entradas de diário-professor em batch
   */
  bulkCreate(
    entries: Array<{
      situacao: boolean;
      diarioId: string;
      perfilId: string;
    }>,
  ): Promise<void>;
}
