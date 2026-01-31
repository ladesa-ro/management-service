import type { SelectQueryBuilder } from "typeorm";
import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioPreferenciaAgrupamentoFindOneOutput,
  DiarioPreferenciaAgrupamentoListOutput,
} from "../../dtos";

/**
 * Token de injeção para o repositório de DiarioPreferenciaAgrupamento
 */
export const DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT = Symbol(
  "IDiarioPreferenciaAgrupamentoRepositoryPort",
);

/**
 * Port de saída para operações de persistência de DiarioPreferenciaAgrupamento
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioPreferenciaAgrupamentoRepositoryPort
  extends IBaseCrudRepositoryPort<
    DiarioPreferenciaAgrupamentoEntity,
    DiarioPreferenciaAgrupamentoListOutput,
    DiarioPreferenciaAgrupamentoFindOneOutput
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity>;
}
