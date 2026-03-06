import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IReserva } from "@/Ladesa.Management.Application/ambientes/reserva";
import type {
  ReservaFindOneOutputDto,
  ReservaListOutputDto,
} from "@/Ladesa.Management.Application/ambientes/reserva/application/dtos";

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
