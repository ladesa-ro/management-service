import type { IUsuario } from "@/modules/@acesso/usuario/domain/usuario.types";
import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente.types";

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
