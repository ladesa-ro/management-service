import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Reserva } from "@/Ladesa.Management.Application/ambientes/reserva";
import type {
  ReservaFindOneOutputDto,
  ReservaListOutputDto,
} from "@/Ladesa.Management.Application/ambientes/reserva/application/dtos";

export const IReservaRepository = Symbol("IReservaRepository");

/**
 * Port de saída para operações de persistência de Reserva
 * Estende a interface base de CRUD com operações padrão
 */
export interface IReservaRepository
  extends IBaseCrudRepositoryPort<Reserva, ReservaListOutputDto, ReservaFindOneOutputDto> {
  /**
   * Busca uma reserva por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null>;
}
