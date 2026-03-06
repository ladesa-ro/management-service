import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IEtapa } from "@/Ladesa.Management.Application/ensino/etapa";
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
