import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { CursoFindOneOutputDto, CursoListOutputDto } from "@/server/nest/modules/curso/rest";
import type { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

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
