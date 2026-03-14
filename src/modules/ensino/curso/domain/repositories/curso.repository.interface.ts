import type { IBaseCrudRepository } from "@/modules/@shared";
import type { ICurso } from "@/modules/ensino/curso";
import type { CursoFindOneOutputDto, CursoListOutputDto } from "../../application/dtos";

/**
 * Token de injeção para o repositório de Curso
 */
export const ICursoRepository = Symbol("ICursoRepository");

/**
 * Port de saída para operações de persistência de Curso
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICursoRepository
  extends IBaseCrudRepository<ICurso, CursoListOutputDto, CursoFindOneOutputDto> {}
