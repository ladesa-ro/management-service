import type { SelectQueryBuilder } from "typeorm";
import type { PartialEntity } from "@/core/@shared";
import type { TurmaDisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  TurmaDisponibilidadeFindOneInput,
  TurmaDisponibilidadeFindOneOutput,
  TurmaDisponibilidadeListInput,
  TurmaDisponibilidadeListOutput,
} from "../../dtos";

/**
 * Token de injeção para o repositório de TurmaDisponibilidade
 */
export const TURMA_DISPONIBILIDADE_REPOSITORY_PORT = Symbol("ITurmaDisponibilidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de TurmaDisponibilidade
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ITurmaDisponibilidadeRepositoryPort {
  /**
   * Lista turma-disponibilidades com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeListInput | null,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeListOutput>;

  /**
   * Busca uma turma-disponibilidade por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: TurmaDisponibilidadeFindOneInput,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeFindOneOutput | null>;

  /**
   * Busca simplificada por ID
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput | null>;

  /**
   * Cria uma nova instância de entidade (não persiste)
   */
  create(): TurmaDisponibilidadeEntity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(entity: TurmaDisponibilidadeEntity, data: PartialEntity<TurmaDisponibilidadeEntity>): void;

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(entity: PartialEntity<TurmaDisponibilidadeEntity>): Promise<TurmaDisponibilidadeEntity>;

  /**
   * Executa soft delete por ID
   */
  softDeleteById(id: string): Promise<void>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<TurmaDisponibilidadeEntity>;
}
