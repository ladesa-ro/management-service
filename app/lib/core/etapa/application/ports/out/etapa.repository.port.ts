import type { DeepPartial } from "typeorm";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de Etapa
 */
export const ETAPA_REPOSITORY_PORT = Symbol("IEtapaRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Etapa
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IEtapaRepositoryPort {
  /**
   * Lista etapas com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de etapas
   */
  findAll(
    accessContext: AccessContext,
    dto: EtapaListInput | null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutput>;

  /**
   * Busca uma etapa por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da etapa
   * @param selection Campos a serem selecionados
   * @returns Etapa encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: EtapaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutput | null>;

  /**
   * Busca uma etapa por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID da etapa
   * @param selection Campos a serem selecionados
   * @returns Etapa encontrada ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) uma etapa
   * @param etapa Dados parciais da etapa a ser salva
   * @returns Etapa salva
   */
  save(etapa: DeepPartial<EtapaEntity>): Promise<EtapaEntity>;

  /**
   * Cria uma nova entidade etapa
   * @returns Nova instancia de EtapaEntity
   */
  create(): EtapaEntity;

  /**
   * Mescla dados parciais em uma etapa existente
   * @param etapa Etapa base
   * @param data Dados a serem mesclados
   */
  merge(etapa: EtapaEntity, data: DeepPartial<EtapaEntity>): void;

  /**
   * Soft delete de uma etapa por ID
   * @param id ID da etapa
   */
  softDeleteById(id: string): Promise<void>;
}
