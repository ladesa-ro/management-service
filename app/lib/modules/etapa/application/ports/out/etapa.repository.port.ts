import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { EtapaEntity } from "@/modules/etapa/infrastructure/persistence/typeorm";
import type { EtapaFindOneOutput, EtapaListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de Etapa
 */
export const ETAPA_REPOSITORY_PORT = Symbol("IEtapaRepositoryPort");

/**
 * Port de saída para operações de persistência de Etapa
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEtapaRepositoryPort
  extends IBaseCrudRepositoryPort<EtapaEntity, EtapaListOutput, EtapaFindOneOutput> {
  /**
   * Busca uma etapa por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutput | null>;
}
