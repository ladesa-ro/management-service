import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { BlocoFindOneOutput, BlocoListOutput } from "@/core/bloco";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Token de injeção para o repositório de Bloco
 */
export const BLOCO_REPOSITORY_PORT = Symbol("IBlocoRepositoryPort");

/**
 * Port de saída para operações de persistência de Bloco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IBlocoRepositoryPort
  extends IBaseCrudRepositoryPort<BlocoEntity, BlocoListOutput, BlocoFindOneOutput> {}
