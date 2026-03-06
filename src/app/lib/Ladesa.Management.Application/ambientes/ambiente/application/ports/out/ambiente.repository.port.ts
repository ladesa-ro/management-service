import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IAmbiente } from "@/Ladesa.Management.Application/ambientes/ambiente";
import type { AmbienteFindOneOutputDto, AmbienteListOutputDto } from "../../dtos";

/**
 * Token de injeção para o repositório de Ambiente
 */
export const AMBIENTE_REPOSITORY_PORT = Symbol("IAmbienteRepositoryPort");

/**
 * Port de saída para operações de persistência de Ambiente
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAmbienteRepositoryPort
  extends IBaseCrudRepositoryPort<IAmbiente, AmbienteListOutputDto, AmbienteFindOneOutputDto> {}
