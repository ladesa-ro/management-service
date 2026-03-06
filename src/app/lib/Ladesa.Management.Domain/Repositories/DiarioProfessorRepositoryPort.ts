import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IDiarioProfessor } from "@/Ladesa.Management.Application/ensino/diario-professor";
import type { DiarioProfessorFindOneOutputDto, DiarioProfessorListOutputDto } from "@/Ladesa.Management.Application/ensino/diario-professor/application/dtos";

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
