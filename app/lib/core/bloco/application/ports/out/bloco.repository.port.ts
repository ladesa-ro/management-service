import type { DeepPartial } from "typeorm";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
} from "@/core/bloco";

/**
 * Token de injecao para o repositorio de Bloco
 */
export const BLOCO_REPOSITORY_PORT = Symbol("IBlocoRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Bloco
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IBlocoRepositoryPort {
  /**
   * Lista blocos com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de blocos
   */
  findAll(
    accessContext: AccessContext,
    dto: BlocoListInput,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutput>;

  /**
   * Busca um bloco por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao (pode ser null)
   * @param dto DTO com ID do bloco
   * @param selection Campos a serem selecionados
   * @returns Bloco encontrado ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutput | null>;

  /**
   * Busca um bloco por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID do bloco
   * @param selection Campos a serem selecionados
   * @returns Bloco encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) um bloco
   * @param bloco Dados parciais do bloco a ser salvo
   * @returns Bloco salvo
   */
  save(bloco: DeepPartial<BlocoEntity>): Promise<BlocoEntity>;

  /**
   * Cria uma nova entidade bloco
   * @returns Nova instancia de BlocoEntity
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
