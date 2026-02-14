import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/modules/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import type {
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
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
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity>;
}
