import type { IBaseCrudRepositoryPort, PartialEntity } from "@/modules/@shared";
import type {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInput,
  IntervaloDeTempoListOutput,
} from "@/modules/intervalo-de-tempo";
import type { IntervaloDeTempoEntity } from "@/modules/intervalo-de-tempo/infrastructure/persistence/typeorm";

export const INTERVALO_DE_TEMPO_REPOSITORY_PORT = Symbol("IIntervaloDeTempoRepositoryPort");

/**
 * Port de saída para operações de persistência de IntervaloDeTempo
 * Estende a interface base de CRUD com métodos específicos do módulo
 */
export interface IIntervaloDeTempoRepositoryPort
  extends Omit<
    IBaseCrudRepositoryPort<
      IntervaloDeTempoEntity,
      IntervaloDeTempoListOutput,
      IntervaloDeTempoFindOneOutput
    >,
    "softDeleteById"
  > {
  /**
   * Busca um intervalo de tempo por parâmetros específicos
   */
  findOne(dto: IntervaloDeTempoInput): Promise<IntervaloDeTempoFindOneOutput | null>;

  /**
   * Busca um intervalo de tempo por ID ou lança erro
   */
  findOneByIdOrFail(id: string): Promise<IntervaloDeTempoFindOneOutput>;

  /**
   * Sobrescreve merge com assinatura específica
   */
  merge(intervalo: IntervaloDeTempoEntity, data: PartialEntity<IntervaloDeTempoEntity>): void;
}
