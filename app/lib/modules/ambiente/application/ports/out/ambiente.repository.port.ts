import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { AmbienteEntity } from "@/modules/ambiente/infrastructure/persistence/typeorm";
import type { AmbienteFindOneOutput, AmbienteListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de Ambiente
 */
export const AMBIENTE_REPOSITORY_PORT = Symbol("IAmbienteRepositoryPort");

/**
 * Port de saída para operações de persistência de Ambiente
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAmbienteRepositoryPort
  extends IBaseCrudRepositoryPort<AmbienteEntity, AmbienteListOutput, AmbienteFindOneOutput> {}
