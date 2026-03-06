import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { ICurso } from "@/Ladesa.Management.Application/ensino/curso";
import type {
  CursoFindOneOutputDto,
  CursoListOutputDto,
} from "@/Ladesa.Management.Application/ensino/curso/application/dtos";

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
