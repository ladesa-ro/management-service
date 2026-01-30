import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  PerfilFindOneInput,
  PerfilFindOneOutput,
  PerfilListInput,
  PerfilListOutput,
  PerfilSetVinculosInput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Perfil
 * Define os contratos que os controllers devem usar
 */
export interface IPerfilUseCasePort {
  /**
   * Busca todos os perfis ativos de um usuário
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param usuarioId ID do usuário
   * @returns Lista de perfis ativos
   */
  findAllActive(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutput[]>;

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
   * Busca um perfil por ID (lança erro se não encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do perfil
   * @returns Perfil encontrado
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: PerfilFindOneInput,
  ): Promise<PerfilFindOneOutput>;

  /**
   * Define os vínculos de um perfil
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com dados do perfil e vínculos
   * @returns Lista atualizada de perfis
   */
  setVinculos(
    accessContext: AccessContext,
    dto: PerfilFindOneInput & PerfilSetVinculosInput,
  ): Promise<PerfilListOutput>;
}
