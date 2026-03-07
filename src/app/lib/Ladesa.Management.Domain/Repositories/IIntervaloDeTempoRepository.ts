import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type {
  IntervaloDeTempo,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";

export const IIntervaloDeTempoRepository = Symbol("IIntervaloDeTempoRepository");

/**
 * Port de saída para operações de persistência de IntervaloDeTempo
 * Estende a interface base de CRUD com métodos específicos do módulo
 */
export interface IIntervaloDeTempoRepository
  extends Omit<
    IBaseCrudRepositoryPort<
      IntervaloDeTempo,
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
