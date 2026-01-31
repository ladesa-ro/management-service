import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { ReservaEntity } from "@/modules/reserva/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { ReservaFindOneOutput, ReservaListOutput } from "../../dtos";

export const RESERVA_REPOSITORY_PORT = Symbol("RESERVA_REPOSITORY_PORT");

/**
 * Port de saída para operações de persistência de Reserva
 * Estende a interface base de CRUD com operações padrão
 */
export interface IReservaRepositoryPort
  extends IBaseCrudRepositoryPort<ReservaEntity, ReservaListOutput, ReservaFindOneOutput> {
  /**
   * Busca uma reserva por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ReservaFindOneOutput | null>;
}
