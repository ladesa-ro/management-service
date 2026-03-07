import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Disciplina } from "@/Ladesa.Management.Application/ensino/disciplina";
import type {
  DisciplinaFindOneOutputDto,
  DisciplinaListOutputDto,
} from "@/Ladesa.Management.Application/ensino/disciplina/application/dtos";

/**
 * Token de injeção para o repositório de Disciplina
 */
export const IDisciplinaRepository = Symbol("IDisciplinaRepository");

/**
 * Port de saída para operações de persistência de Disciplina
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisciplinaRepository
  extends IBaseCrudRepositoryPort<
    Disciplina,
    DisciplinaListOutputDto,
    DisciplinaFindOneOutputDto
  > {}
