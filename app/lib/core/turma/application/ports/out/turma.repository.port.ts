import type { PartialEntity } from "@/core/@shared";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  TurmaFindOneInput,
  TurmaFindOneOutput,
  TurmaListInput,
  TurmaListOutput,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de Turma
 */
export const TURMA_REPOSITORY_PORT = Symbol("ITurmaRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Turma
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface ITurmaRepositoryPort {
  /**
   * Lista turmas com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de turmas
   */
  findAll(
    accessContext: AccessContext,
    dto: TurmaListInput | null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutput>;

  /**
   * Busca uma turma por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao (pode ser null)
   * @param dto DTO com ID da turma
   * @param selection Campos a serem selecionados
   * @returns Turma encontrada ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutput | null>;

  /**
   * Busca uma turma por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID da turma
   * @param selection Campos a serem selecionados
   * @returns Turma encontrada ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) uma turma
   * @param turma Dados parciais da turma a ser salva
   * @returns Turma salva
   */
  save(turma: PartialEntity<TurmaEntity>): Promise<TurmaEntity>;

  /**
   * Cria uma nova entidade turma
   * @returns Nova instancia de TurmaEntity
   */
  create(): TurmaEntity;

  /**
   * Mescla dados parciais em uma turma existente
   * @param turma Turma base
   * @param data Dados a serem mesclados
   */
  merge(turma: TurmaEntity, data: PartialEntity<TurmaEntity>): void;

  /**
   * Soft delete de uma turma por ID
   * @param id ID da turma
   */
  softDeleteById(id: string): Promise<void>;
}
