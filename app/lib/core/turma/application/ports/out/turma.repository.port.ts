import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { TurmaFindOneOutput, TurmaListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de Turma
 */
export const TURMA_REPOSITORY_PORT = Symbol("ITurmaRepositoryPort");

/**
 * Port de saída para operações de persistência de Turma
 * Estende a interface base de CRUD com operações padrão
 */
export interface ITurmaRepositoryPort
  extends IBaseCrudRepositoryPort<TurmaEntity, TurmaListOutput, TurmaFindOneOutput> {}
