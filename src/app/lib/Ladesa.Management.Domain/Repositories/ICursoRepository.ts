import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Curso } from "@/Ladesa.Management.Application/ensino/curso";
import { type CursoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneOutputDto";
import { type CursoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoListOutputDto";

/**
 * Token de injeção para o repositório de Curso
 */
export const ICursoRepository = Symbol("ICursoRepository");

/**
 * Port de saída para operações de persistência de Curso
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICursoRepository
  extends IBaseCrudRepositoryPort<Curso, CursoListOutputDto, CursoFindOneOutputDto> {}
