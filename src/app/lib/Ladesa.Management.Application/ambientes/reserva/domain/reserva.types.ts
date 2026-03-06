import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { IUsuario } from "@/Ladesa.Management.Application/acesso/usuario/domain/usuario.types";
import type { IAmbiente } from "@/Ladesa.Management.Application/ambientes/ambiente/domain/ambiente.types";

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
