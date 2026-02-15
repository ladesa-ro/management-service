import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IReserva } from "@/modules/sisgea/reserva";
import type { ReservaFindOneOutputDto, ReservaListOutputDto } from "../../dtos";

export const RESERVA_REPOSITORY_PORT = Symbol("RESERVA_REPOSITORY_PORT");

/**
 * Port de saída para operações de persistência de Reserva
 * Estende a interface base de CRUD com operações padrão
 */
export interface IReservaRepositoryPort
  extends IBaseCrudRepositoryPort<IReserva, ReservaListOutputDto, ReservaFindOneOutputDto> {
  /**
   * Busca uma reserva por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null>;
}
