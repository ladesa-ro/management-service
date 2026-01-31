import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { DisciplinaFindOneOutput, DisciplinaListOutput } from "@/core/disciplina/application/dtos";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Token de injeção para o repositório de Disciplina
 */
export const DISCIPLINA_REPOSITORY_PORT = Symbol("IDisciplinaRepositoryPort");

/**
 * Port de saída para operações de persistência de Disciplina
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisciplinaRepositoryPort
  extends IBaseCrudRepositoryPort<DisciplinaEntity, DisciplinaListOutput, DisciplinaFindOneOutput> {}
