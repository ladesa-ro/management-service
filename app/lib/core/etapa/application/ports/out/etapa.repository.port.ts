import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
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
