import type { SelectQueryBuilder } from "typeorm";
import type { IBaseCrudRepository } from "@/domain/abstractions";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/modules/ensino/diario/infrastructure.database";
import type { AccessContext } from "@/server/access-context";
import type {
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../queries";
/**
 * Token de injeção para o repositório de DiarioPreferenciaAgrupamento
 */
export const IDiarioPreferenciaAgrupamentoRepository = Symbol(
  "IDiarioPreferenciaAgrupamentoRepository",
);

/**
 * Port de saída para operações de persistência de DiarioPreferenciaAgrupamento
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioPreferenciaAgrupamentoRepository
  extends IBaseCrudRepository<
    IDiarioPreferenciaAgrupamento,
    DiarioPreferenciaAgrupamentoListQueryResult,
    DiarioPreferenciaAgrupamentoFindOneQueryResult
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneQueryResult | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity>;

  /**
   * Soft-delete todos os registros de preferência de agrupamento de um diário
   */
  softDeleteByDiarioId(diarioId: string): Promise<void>;

  /**
   * Cria múltiplas entradas em batch
   */
  bulkCreate(
    entries: Array<{
      diarioId: string;
      dataInicio: string;
      dataFim?: string | null;
      diaSemanaIso: number;
      aulasSeguidas: number;
    }>,
  ): Promise<void>;
}
