import type { IBaseCrudRepository } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambientes/ambiente";
import type { AmbienteFindOneOutputDto, AmbienteListOutputDto } from "../../application/dtos";

/**
 * Token de injeção para o repositório de Ambiente
 */
export const IAmbienteRepository = Symbol("IAmbienteRepository");

/**
 * Port de saída para operações de persistência de Ambiente
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAmbienteRepository
  extends IBaseCrudRepository<IAmbiente, AmbienteListOutputDto, AmbienteFindOneOutputDto> {}
