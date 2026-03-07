import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Turma } from "@/Ladesa.Management.Application/ensino/turma";
import { type TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";
import { type TurmaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListOutputDto";

/**
 * Token de injeção para o repositório de Turma
 */
export const ITurmaRepository = Symbol("ITurmaRepository");

/**
 * Port de saída para operações de persistência de Turma
 * Estende a interface base de CRUD com operações padrão
 */
export interface ITurmaRepository
  extends IBaseCrudRepositoryPort<Turma, TurmaListOutputDto, TurmaFindOneOutputDto> {}
