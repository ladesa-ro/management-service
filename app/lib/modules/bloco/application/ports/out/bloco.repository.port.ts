import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { BlocoFindOneOutputDto, BlocoListOutputDto, IBloco } from "@/modules/bloco";

/**
 * Token de injeção para o repositório de Bloco
 */
export const BLOCO_REPOSITORY_PORT = Symbol("IBlocoRepositoryPort");

/**
 * Port de saída para operações de persistência de Bloco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IBlocoRepositoryPort
  extends IBaseCrudRepositoryPort<IBloco, BlocoListOutputDto, BlocoFindOneOutputDto> {}
