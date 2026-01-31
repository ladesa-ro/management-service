import type { DeepPartial, SelectQueryBuilder } from "typeorm";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioPreferenciaAgrupamentoFindOneInput,
  DiarioPreferenciaAgrupamentoFindOneOutput,
  DiarioPreferenciaAgrupamentoListInput,
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
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IDiarioPreferenciaAgrupamentoRepositoryPort {
  /**
   * Lista diario-preferencia-agrupamentos com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoListOutput>;

  /**
   * Busca um diario-preferencia-agrupamento por ID
   */
  findById(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null>;

  /**
   * Busca simplificada por ID
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null>;

  /**
   * Cria uma nova instância de entidade (não persiste)
   */
  create(): DiarioPreferenciaAgrupamentoEntity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(
    entity: DiarioPreferenciaAgrupamentoEntity,
    data: DeepPartial<DiarioPreferenciaAgrupamentoEntity>,
  ): void;

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(
    entity: DeepPartial<DiarioPreferenciaAgrupamentoEntity>,
  ): Promise<DiarioPreferenciaAgrupamentoEntity>;

  /**
   * Executa soft delete por ID
   */
  softDeleteById(id: string): Promise<void>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity>;
}
