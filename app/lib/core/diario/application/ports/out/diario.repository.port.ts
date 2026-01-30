import type { DeepPartial } from "typeorm";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
} from "@/core/diario/application/dtos";

/**
 * Token de injecao para o repositorio de Diario
 */
export const DIARIO_REPOSITORY_PORT = Symbol("IDiarioRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Diario
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IDiarioRepositoryPort {
  /**
   * Lista diarios com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de diarios
   */
  findAll(
    accessContext: AccessContext,
    dto: DiarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutput>;

  /**
   * Busca um diario por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID do diario
   * @param selection Campos a serem selecionados
   * @returns Diario encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: DiarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput | null>;

  /**
   * Busca um diario por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID do diario
   * @param selection Campos a serem selecionados
   * @returns Diario encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) um diario
   * @param diario Dados parciais do diario a ser salvo
   * @returns Diario salvo
   */
  save(diario: DeepPartial<DiarioEntity>): Promise<DiarioEntity>;

  /**
   * Cria uma nova entidade diario
   * @returns Nova instancia de DiarioEntity
   */
  create(): DiarioEntity;

  /**
   * Mescla dados parciais em um diario existente
   * @param diario Diario base
   * @param data Dados a serem mesclados
   */
  merge(diario: DiarioEntity, data: DeepPartial<DiarioEntity>): void;

  /**
   * Soft delete de um diario por ID
   * @param id ID do diario
   */
  softDeleteById(id: string): Promise<void>;
}
