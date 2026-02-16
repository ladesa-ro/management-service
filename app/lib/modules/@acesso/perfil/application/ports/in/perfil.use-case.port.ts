import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilSetVinculosInputDto,
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
  ): Promise<PerfilFindOneOutputDto[]>;

  /**
   * Lista perfis com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de perfis
   */
  findAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null,
  ): Promise<PerfilListOutputDto>;

  /**
   * Busca um perfil por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do perfil
   * @returns Perfil encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto | null>;

  /**
   * Busca um perfil por ID (lança erro se não encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do perfil
   * @returns Perfil encontrado
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto>;

  /**
   * Define os vínculos (cargos) de um usuário em um campus
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com usuário, campus e lista de cargos
   * @returns Lista atualizada de perfis do usuário no campus
   */
  setVinculos(
    accessContext: AccessContext,
    dto: PerfilSetVinculosInputDto,
  ): Promise<PerfilListOutputDto>;
}
