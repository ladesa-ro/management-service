import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
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
