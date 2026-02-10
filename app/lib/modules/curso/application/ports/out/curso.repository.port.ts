import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { ICurso } from "@/modules/curso";
import type { CursoFindOneOutputDto, CursoListOutputDto } from "../../dtos";

/**
 * Token de injeção para o repositório de Curso
 */
export const CURSO_REPOSITORY_PORT = Symbol("ICursoRepositoryPort");

/**
 * Port de saída para operações de persistência de Curso
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICursoRepositoryPort
  extends IBaseCrudRepositoryPort<ICurso, CursoListOutputDto, CursoFindOneOutputDto> {}
