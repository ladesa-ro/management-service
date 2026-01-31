import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { AulaEntity } from "@/modules/aula/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { AulaFindOneOutput, AulaListOutput } from "../../dtos";

export const AULA_REPOSITORY_PORT = Symbol("IAulaRepositoryPort");

/**
 * Port de saída para operações de persistência de Aula
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAulaRepositoryPort
  extends IBaseCrudRepositoryPort<AulaEntity, AulaListOutput, AulaFindOneOutput> {
  /**
   * Busca uma aula por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;
}
