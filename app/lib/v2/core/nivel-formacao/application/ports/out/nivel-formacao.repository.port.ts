import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
} from "@/v2/server/modules/nivel-formacao/http/dto";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface INivelFormacaoRepositoryPort {
  /**
   * Lista níveis de formação com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de níveis de formação
   */
  findAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null,
    selection?: string[],
  ): Promise<NivelFormacaoListOutputDto>;

  /**
   * Busca um nível de formação por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão (pode ser null)
   * @param dto DTO com ID do nível de formação
   * @param selection Campos a serem selecionados
   * @returns Nível de formação encontrado ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null>;

  /**
   * Busca um nível de formação por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param id ID do nível de formação
   * @param selection Campos a serem selecionados
   * @returns Nível de formação encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null>;

  /**
   * Salva (cria ou atualiza) um nível de formação
   * @param nivelFormacao Dados parciais do nível de formação a ser salvo
   * @returns Nível de formação salvo
   */
  save(nivelFormacao: DeepPartial<NivelFormacaoEntity>): Promise<NivelFormacaoEntity>;

  /**
   * Cria uma nova entidade nível de formação
   * @returns Nova instância de NivelFormacaoEntity
   */
  create(): NivelFormacaoEntity;

  /**
   * Mescla dados parciais em um nível de formação existente
   * @param nivelFormacao Nível de formação base
   * @param data Dados a serem mesclados
   */
  merge(nivelFormacao: NivelFormacaoEntity, data: DeepPartial<NivelFormacaoEntity>): void;

  /**
   * Soft delete de um nível de formação por ID
   * @param id ID do nível de formação
   */
  softDeleteById(id: string): Promise<void>;
}
