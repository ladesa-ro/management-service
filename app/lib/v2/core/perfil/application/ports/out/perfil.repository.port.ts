import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
} from "@/v2/server/modules/perfil/http/dto";
import type { PerfilEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type {
  IPaginationConfig,
  IPaginationCriteria,
  IPaginationResult,
} from "@/v2/application/ports/pagination";

/**
 * Port de saída para operações de persistência de Perfil
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IPerfilRepositoryPort {
  /**
   * Lista perfis com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de perfis
   */
  findAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<PerfilListOutputDto>;

  /**
   * Busca um perfil por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do perfil
   * @param selection Campos a serem selecionados
   * @returns Perfil encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<PerfilFindOneOutputDto | null>;

  /**
   * Busca perfis ativos de um usuário
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param usuarioId ID do usuário
   * @returns Lista de perfis ativos
   */
  findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutputDto[]>;

  /**
   * Busca perfis com paginação usando critérios genéricos
   * @param accessContext Contexto de acesso
   * @param criteria Critérios de paginação genéricos
   * @param config Configuração de paginação
   * @param selection Campos a serem selecionados
   * @returns Resultado paginado
   */
  findPaginated(
    accessContext: AccessContext,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig<PerfilFindOneOutputDto>,
    selection?: string[] | boolean,
  ): Promise<IPaginationResult<PerfilFindOneOutputDto>>;

  /**
   * Cria ou atualiza perfis em lote
   * @param perfis Array com dados parciais dos perfis a serem salvos
   */
  saveMany(perfis: DeepPartial<PerfilEntity>[]): Promise<void>;

  /**
   * Busca perfis existentes por usuário e campus
   * @param usuarioId ID do usuário
   * @param campusId ID do campus
   * @returns Lista de perfis do usuário no campus
   */
  findByUsuarioAndCampus(usuarioId: string, campusId: string): Promise<PerfilFindOneOutputDto[]>;

  /**
   * Desativa perfis por IDs
   * @param ids Array de IDs dos perfis a serem desativados
   */
  deactivateByIds(ids: string[]): Promise<void>;
}
