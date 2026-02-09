import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type {
  DisciplinaFindOneOutputDto,
  DisciplinaListOutputDto,
} from "@/modules/disciplina/application/dtos";
import type { DisciplinaEntity } from "@/modules/disciplina/infrastructure/persistence/typeorm";

/**
 * Token de injeção para o repositório de Disciplina
 */
export const DISCIPLINA_REPOSITORY_PORT = Symbol("IDisciplinaRepositoryPort");

/**
 * Port de saída para operações de persistência de Disciplina
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisciplinaRepositoryPort
  extends IBaseCrudRepositoryPort<
    DisciplinaEntity,
    DisciplinaListOutputDto,
    DisciplinaFindOneOutputDto
  > {}
