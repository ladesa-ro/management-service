import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { TurmaDisponibilidade } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade";
import type {
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/turma-disponibilidade/application/dtos";
import type { TurmaDisponibilidadeEntity } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade/infrastructure/persistence/typeorm";

/**
 * Token de injeção para o repositório de TurmaDisponibilidade
 */
export const ITurmaDisponibilidadeRepository = Symbol("ITurmaDisponibilidadeRepository");

/**
 * Port de saída para operações de persistência de TurmaDisponibilidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface ITurmaDisponibilidadeRepository
  extends IBaseCrudRepositoryPort<
    TurmaDisponibilidade,
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
