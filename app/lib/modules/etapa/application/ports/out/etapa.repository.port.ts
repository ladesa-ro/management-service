import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IEtapa } from "@/modules/etapa";
import type { EtapaFindOneOutputDto, EtapaListOutputDto } from "../../dtos";

/**
 * Token de injeção para o repositório de Etapa
 */
export const ETAPA_REPOSITORY_PORT = Symbol("IEtapaRepositoryPort");

/**
 * Port de saída para operações de persistência de Etapa
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEtapaRepositoryPort
  extends IBaseCrudRepositoryPort<IEtapa, EtapaListOutputDto, EtapaFindOneOutputDto> {
  /**
   * Busca uma etapa por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null>;
}
