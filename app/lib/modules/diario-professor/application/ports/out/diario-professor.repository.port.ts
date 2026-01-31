import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { DiarioProfessorEntity } from "@/modules/diario-professor/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { DiarioProfessorFindOneOutput, DiarioProfessorListOutput } from "../../dtos";

export const DIARIO_PROFESSOR_REPOSITORY_PORT = Symbol("IDiarioProfessorRepositoryPort");

/**
 * Port de saída para operações de persistência de DiarioProfessor
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioProfessorRepositoryPort
  extends IBaseCrudRepositoryPort<
    DiarioProfessorEntity,
    DiarioProfessorListOutput,
    DiarioProfessorFindOneOutput
  > {
  /**
   * Busca um diário de professor por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput | null>;
}
