import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { CursoEntity } from "@/modules/curso/infrastructure/persistence/typeorm";
import type { CursoFindOneOutputDto, CursoListOutputDto } from "@/server/nest/modules/curso/rest";

/**
 * Token de injeção para o repositório de Curso
 */
export const CURSO_REPOSITORY_PORT = Symbol("ICursoRepositoryPort");

/**
 * Port de saída para operações de persistência de Curso
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICursoRepositoryPort
  extends IBaseCrudRepositoryPort<CursoEntity, CursoListOutputDto, CursoFindOneOutputDto> {}
