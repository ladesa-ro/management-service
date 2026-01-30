import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
} from "@/v2/server/modules/bloco/http/dto";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Port de saída para operações de persistência de Bloco
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IBlocoRepositoryPort {
  /**
   * Lista blocos com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de blocos
   */
  findAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto>;

  /**
   * Busca um bloco por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão (pode ser null)
   * @param dto DTO com ID do bloco
   * @param selection Campos a serem selecionados
   * @returns Bloco encontrado ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null>;

  /**
   * Busca um bloco por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param id ID do bloco
   * @param selection Campos a serem selecionados
   * @returns Bloco encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null>;

  /**
   * Salva (cria ou atualiza) um bloco
   * @param bloco Dados parciais do bloco a ser salvo
   * @returns Bloco salvo
   */
  save(bloco: DeepPartial<BlocoEntity>): Promise<BlocoEntity>;

  /**
   * Cria uma nova entidade bloco
   * @returns Nova instância de BlocoEntity
   */
  create(): BlocoEntity;

  /**
   * Mescla dados parciais em um bloco existente
   * @param bloco Bloco base
   * @param data Dados a serem mesclados
   */
  merge(bloco: BlocoEntity, data: DeepPartial<BlocoEntity>): void;

  /**
   * Soft delete de um bloco por ID
   * @param id ID do bloco
   */
  softDeleteById(id: string): Promise<void>;
}
