import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IDiarioProfessor } from "@/modules/ensino/diario-professor";
import type { DiarioProfessorFindOneOutputDto, DiarioProfessorListOutputDto } from "../../dtos";

export const DIARIO_PROFESSOR_REPOSITORY_PORT = Symbol("IDiarioProfessorRepositoryPort");

/**
 * Port de saída para operações de persistência de DiarioProfessor
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioProfessorRepositoryPort
  extends IBaseCrudRepositoryPort<
    IDiarioProfessor,
    DiarioProfessorListOutputDto,
    DiarioProfessorFindOneOutputDto
  > {
  /**
   * Busca um diário de professor por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null>;
}
