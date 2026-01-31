import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambiente/domain/ambiente.types";
import type { IUsuario } from "@/modules/usuario/domain/usuario.types";

/**
 * Interface que define a estrutura de uma Reserva
 */
export interface IReserva {
  id: IdUuid;
  situacao: string;
  motivo: string | null;
  tipo: string | null;
  rrule: string;
  ambiente: IAmbiente;
  usuario: IUsuario;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
