import type { IAmbiente } from "@/v2/core/ambiente/domain/ambiente.types";
import type { IUsuario } from "@/v2/core/usuario/domain/usuario.types";

/**
 * Interface que define a estrutura de uma Reserva
 */
export interface IReserva {
  id: string;
  situacao: string;
  motivo: string | null;
  tipo: string | null;
  rrule: string;
  ambiente: IAmbiente;
  usuario: IUsuario;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Interface para criação de Reserva
 */
export interface IReservaCreate {
  situacao: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule: string;
  ambiente: { id: string };
  usuario: { id: string };
}

/**
 * Interface para atualização de Reserva
 */
export interface IReservaUpdate {
  situacao?: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule?: string;
  ambiente?: { id: string };
  usuario?: { id: string };
}
