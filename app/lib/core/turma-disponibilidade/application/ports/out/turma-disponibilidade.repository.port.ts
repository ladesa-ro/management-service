import type { SelectQueryBuilder } from "typeorm";
import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { TurmaDisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { TurmaDisponibilidadeFindOneOutput, TurmaDisponibilidadeListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de TurmaDisponibilidade
 */
export const TURMA_DISPONIBILIDADE_REPOSITORY_PORT = Symbol("ITurmaDisponibilidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de TurmaDisponibilidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface ITurmaDisponibilidadeRepositoryPort
  extends IBaseCrudRepositoryPort<
    TurmaDisponibilidadeEntity,
    TurmaDisponibilidadeListOutput,
    TurmaDisponibilidadeFindOneOutput
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<TurmaDisponibilidadeEntity>;
}
