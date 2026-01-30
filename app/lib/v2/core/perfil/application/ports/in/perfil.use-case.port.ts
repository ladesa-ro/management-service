import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilUpdateInputDto,
} from "@/v2/server/modules/perfil/http/dto";

/**
 * Port de entrada para casos de uso de Perfil
 * Define os contratos que os controllers devem usar
 */
export interface IPerfilUseCasePort {
  /**
   * Busca todos os perfis ativos de um usuário
   */
  perfilGetAllActive(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutputDto[]>;

  /**
   * Lista perfis com paginação
   */
  perfilFindAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<PerfilListOutputDto>;

  /**
   * Busca um perfil por ID
   */
  perfilFindById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto & { pathId?: string },
    selection?: string[] | boolean,
  ): Promise<PerfilFindOneOutputDto | null>;

  /**
   * Busca um perfil por ID (lança erro se não encontrado)
   */
  perfilFindByIdStrict(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<PerfilFindOneOutputDto>;

  /**
   * Define os vínculos de um perfil
   */
  perfilSetVinculos(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto & PerfilUpdateInputDto,
  ): Promise<PerfilListOutputDto>;
}
