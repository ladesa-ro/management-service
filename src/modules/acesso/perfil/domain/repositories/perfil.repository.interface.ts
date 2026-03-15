import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IPersistRepository } from "@/modules/@shared";
import type {
  PerfilFindOneQuery,
  PerfilFindOneQueryResult,
  PerfilListQuery,
  PerfilListQueryResult,
} from "../queries";
/**
 * Token de injeção para o repositório de Perfil
 */
export const IPerfilRepository = Symbol("IPerfilRepository");

/**
 * Port de saída para operações de persistência de Perfil
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IPerfilRepository extends IPersistRepository<Record<string, any>> {
  /**
   * Lista perfis com paginação
   */
  findAll(
    accessContext: AccessContext | null,
    dto: PerfilListQuery | null,
  ): Promise<PerfilListQueryResult>;

  /**
   * Busca um perfil por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: PerfilFindOneQuery,
  ): Promise<PerfilFindOneQueryResult | null>;

  /**
   * Busca perfis ativos de um usuário
   */
  findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneQueryResult[]>;

  /**
   * Busca perfis existentes por usuário e campus
   */
  findByUsuarioAndCampus(usuarioId: string, campusId: string): Promise<PerfilFindOneQueryResult[]>;

  /**
   * Desativa perfis por IDs
   */
  deactivateByIds(ids: string[]): Promise<void>;
}
