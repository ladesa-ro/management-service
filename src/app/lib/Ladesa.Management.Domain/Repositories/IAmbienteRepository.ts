import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Ambiente } from "@/Ladesa.Management.Application/ambientes/ambiente";
import { type AmbienteFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneOutputDto";
import { type AmbienteListOutputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteListOutputDto";

/**
 * Token de injeção para o repositório de Ambiente
 */
export const IAmbienteRepository = Symbol("IAmbienteRepository");

/**
 * Port de saída para operações de persistência de Ambiente
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAmbienteRepository
  extends IBaseCrudRepositoryPort<Ambiente, AmbienteListOutputDto, AmbienteFindOneOutputDto> {}
