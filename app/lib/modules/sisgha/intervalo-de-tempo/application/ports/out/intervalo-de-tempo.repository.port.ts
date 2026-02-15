import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type {
  IIntervaloDeTempo,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/modules/sisgha/intervalo-de-tempo";

export const INTERVALO_DE_TEMPO_REPOSITORY_PORT = Symbol("IIntervaloDeTempoRepositoryPort");

/**
 * Port de saída para operações de persistência de IntervaloDeTempo
 * Estende a interface base de CRUD com métodos específicos do módulo
 */
export interface IIntervaloDeTempoRepositoryPort
  extends Omit<
    IBaseCrudRepositoryPort<
      IIntervaloDeTempo,
      IntervaloDeTempoListOutputDto,
      IntervaloDeTempoFindOneOutputDto
    >,
    "softDeleteById"
  > {
  /**
   * Busca um intervalo de tempo por parâmetros específicos
   */
  findOne(dto: IntervaloDeTempoInputDto): Promise<IntervaloDeTempoFindOneOutputDto | null>;

  /**
   * Busca um intervalo de tempo por ID ou lança erro
   */
  findOneByIdOrFail(id: string): Promise<IntervaloDeTempoFindOneOutputDto>;
}
