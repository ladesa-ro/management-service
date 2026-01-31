import type { PartialEntity } from "@/modules/@shared";
import type { PerfilEntity } from "@/modules/perfil/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  PerfilFindOneInput,
  PerfilFindOneOutput,
  PerfilListInput,
  PerfilListOutput,
} from "../../dtos";

/**
 * Token de injeção para o repositório de Perfil
 */
export const PERFIL_REPOSITORY_PORT = Symbol("IPerfilRepositoryPort");

/**
 * Port de saída para operações de persistência de Perfil
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IPerfilRepositoryPort {
  /**
   * Cria uma nova instância de entidade (não persiste)
   */
  create(): PerfilEntity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(entity: PerfilEntity, data: PartialEntity<PerfilEntity>): void;

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(entity: PartialEntity<PerfilEntity>): Promise<PerfilEntity>;

  /**
   * Lista perfis com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de perfis
   */
  findAll(accessContext: AccessContext, dto: PerfilListInput | null): Promise<PerfilListOutput>;

  /**
   * Busca um perfil por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do perfil
   * @returns Perfil encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: PerfilFindOneInput,
  ): Promise<PerfilFindOneOutput | null>;

  /**
   * Busca perfis ativos de um usuário
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param usuarioId ID do usuário
   * @returns Lista de perfis ativos
   */
  findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutput[]>;

  /**
   * Cria ou atualiza perfis em lote
   * @param perfis Array com dados parciais dos perfis a serem salvos
   */
  saveMany(perfis: PartialEntity<PerfilEntity>[]): Promise<void>;

  /**
   * Busca perfis existentes por usuário e campus
   * @param usuarioId ID do usuário
   * @param campusId ID do campus
   * @returns Lista de perfis do usuário no campus
   */
  findByUsuarioAndCampus(usuarioId: string, campusId: string): Promise<PerfilFindOneOutput[]>;

  /**
   * Desativa perfis por IDs
   * @param ids Array de IDs dos perfis a serem desativados
   */
  deactivateByIds(ids: string[]): Promise<void>;
}
