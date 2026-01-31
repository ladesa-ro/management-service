import type { ScalarDateTimeString } from "@/core/@shared";
import type { Ambiente } from "@/core/ambiente/domain/ambiente.domain";
import type { Usuario } from "@/core/usuario/domain/usuario.domain";
import type { IReserva, IReservaCreate } from "./reserva.types";

/**
 * Classe de domínio que representa uma Reserva
 * Implementa a interface IReserva
 */
export class Reserva implements IReserva {
  id!: string;
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: Ambiente;
  usuario!: Usuario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  /**
   * Cria uma nova instância de Reserva
   */
  static criar(dados: IReservaCreate): Reserva {
    const reserva = new Reserva();
    reserva.situacao = dados.situacao;
    reserva.motivo = dados.motivo ?? null;
    reserva.tipo = dados.tipo ?? null;
    reserva.rrule = dados.rrule;
    return reserva;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IReserva): Reserva {
    const reserva = new Reserva();
    Object.assign(reserva, dados);
    return reserva;
  }

  /**
   * Verifica se a reserva está ativa (não deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }
}
