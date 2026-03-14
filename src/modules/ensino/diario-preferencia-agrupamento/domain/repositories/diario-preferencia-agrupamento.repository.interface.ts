import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepository } from "@/modules/@shared";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import type {
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
} from "../../application/dtos";

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
    DiarioPreferenciaAgrupamentoListOutputDto,
    DiarioPreferenciaAgrupamentoFindOneOutputDto
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity>;
}
