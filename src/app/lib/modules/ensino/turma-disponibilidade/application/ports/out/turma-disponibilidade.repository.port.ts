import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { ITurmaDisponibilidade } from "@/modules/ensino/turma-disponibilidade";
import type { TurmaDisponibilidadeEntity } from "@/modules/ensino/turma-disponibilidade/infrastructure/persistence/typeorm";
import type {
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListOutputDto,
} from "../../dtos";

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
    ITurmaDisponibilidade,
    TurmaDisponibilidadeListOutputDto,
    TurmaDisponibilidadeFindOneOutputDto
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutputDto | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<TurmaDisponibilidadeEntity>;
}
