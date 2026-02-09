import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { TurmaEntity } from "@/modules/turma/infrastructure/persistence/typeorm";
import type { TurmaFindOneOutputDto, TurmaListOutputDto } from "../../dtos";

/**
 * Token de injeção para o repositório de Turma
 */
export const TURMA_REPOSITORY_PORT = Symbol("ITurmaRepositoryPort");

/**
 * Port de saída para operações de persistência de Turma
 * Estende a interface base de CRUD com operações padrão
 */
export interface ITurmaRepositoryPort
  extends IBaseCrudRepositoryPort<TurmaEntity, TurmaListOutputDto, TurmaFindOneOutputDto> {}
