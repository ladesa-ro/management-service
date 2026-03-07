import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Diario } from "@/Ladesa.Management.Application/ensino/diario";
import { type DiarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneOutputDto";
import { type DiarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListOutputDto";

/**
 * Token de injeção para o repositório de Diario
 */
export const IDiarioRepository = Symbol("IDiarioRepository");

/**
 * Port de saída para operações de persistência de Diario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioRepository
  extends IBaseCrudRepositoryPort<Diario, DiarioListOutputDto, DiarioFindOneOutputDto> {}
