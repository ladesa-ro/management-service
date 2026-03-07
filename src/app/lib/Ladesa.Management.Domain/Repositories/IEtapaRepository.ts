import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Etapa } from "@/Ladesa.Management.Application/ensino/etapa";
import type {
  EtapaFindOneOutputDto,
  EtapaListOutputDto,
} from "@/Ladesa.Management.Application/ensino/etapa/application/dtos";

/**
 * Token de injeção para o repositório de Etapa
 */
export const IEtapaRepository = Symbol("IEtapaRepository");

/**
 * Port de saída para operações de persistência de Etapa
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEtapaRepository
  extends IBaseCrudRepositoryPort<Etapa, EtapaListOutputDto, EtapaFindOneOutputDto> {
  /**
   * Busca uma etapa por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null>;
}
