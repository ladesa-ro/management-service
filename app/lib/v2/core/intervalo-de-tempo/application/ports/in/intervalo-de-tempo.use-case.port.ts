import type { AccessContext } from "@/infrastructure/access-context";
import type { IntervaloDeTempoFindOneOutput, IntervaloDeTempoInput } from "../../dtos";

/**
 * Porta de entrada (use case) para operações de Intervalo de Tempo
 * Define os casos de uso disponíveis para o domínio
 */
export interface IIntervaloDeTempoUseCasePort {
  /**
   * Cria ou atualiza um intervalo de tempo
   * Se o intervalo já existir com os mesmos períodos, retorna o existente
   */
  intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    domain: IntervaloDeTempoInput,
  ): Promise<IntervaloDeTempoFindOneOutput>;
}
