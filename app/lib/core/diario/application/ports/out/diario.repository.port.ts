import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { DiarioFindOneOutput, DiarioListOutput } from "@/core/diario/application/dtos";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Token de injeção para o repositório de Diario
 */
export const DIARIO_REPOSITORY_PORT = Symbol("IDiarioRepositoryPort");

/**
 * Port de saída para operações de persistência de Diario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioRepositoryPort
  extends IBaseCrudRepositoryPort<DiarioEntity, DiarioListOutput, DiarioFindOneOutput> {}
