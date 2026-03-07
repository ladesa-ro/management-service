import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { DiarioProfessor } from "@/Ladesa.Management.Application/ensino/diario-professor";
import { type DiarioProfessorFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorFindOneOutputDto";
import { type DiarioProfessorListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorListOutputDto";

export const IDiarioProfessorRepository = Symbol("IDiarioProfessorRepository");

/**
 * Port de saída para operações de persistência de DiarioProfessor
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioProfessorRepository
  extends IBaseCrudRepositoryPort<
    DiarioProfessor,
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
