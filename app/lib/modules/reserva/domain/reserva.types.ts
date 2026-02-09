import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambiente/domain/ambiente.types";
import type { IUsuario } from "@/modules/usuario/domain/usuario.types";

/**
 * Interface que define a estrutura de uma Reserva
 */
export interface IReserva extends IEntityBase {
  situacao: string;
  motivo: string | null;
  tipo: string | null;
  rrule: string;
  ambiente: IAmbiente;
  usuario: IUsuario;
}

/**
 * Interface para criação de Reserva
 */
export interface IReservaCreate {
  situacao: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule: string;
  ambiente: { id: IdUuid };
  usuario: { id: IdUuid };
}

/**
 * Interface para atualização de Reserva
 */
export interface IReservaUpdate {
  situacao?: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule?: string;
  ambiente?: { id: IdUuid };
  usuario?: { id: IdUuid };
}
