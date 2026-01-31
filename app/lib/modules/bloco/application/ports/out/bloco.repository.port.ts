import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { BlocoFindOneOutput, BlocoListOutput } from "@/modules/bloco";
import type { BlocoEntity } from "@/modules/bloco/infrastructure/persistence/typeorm";

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
