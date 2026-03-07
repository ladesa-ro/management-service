import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IPersistRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
} from "@/Ladesa.Management.Application/acesso/perfil/application/dtos";

/**
 * Token de injeção para o repositório de Perfil
 */
export const IPerfilRepository = Symbol("IPerfilRepository");

/**
 * Port de saída para operações de persistência de Perfil
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IPerfilRepository extends IPersistRepositoryPort<Record<string, any>> {
  /**
   * Lista perfis com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null,
  ): Promise<PerfilListOutputDto>;

  /**
   * Busca um perfil por ID
   */
  findById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto | null>;

  /**
   * Busca perfis ativos de um usuário
   */
  findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutputDto[]>;

  /**
   * Busca perfis existentes por usuário e campus
   */
  findByUsuarioAndCampus(usuarioId: string, campusId: string): Promise<PerfilFindOneOutputDto[]>;

  /**
   * Desativa perfis por IDs
   */
  deactivateByIds(ids: string[]): Promise<void>;
}
