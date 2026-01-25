import type { Ambiente } from "@/v2/core/ambiente/domain/ambiente.domain";
import type { CalendarioLetivo } from "@/v2/core/calendario-letivo/domain/calendario-letivo.domain";
import type { IEvento, IEventoCreate } from "./evento.types";

/**
 * Classe de domínio que representa um Evento
 * Implementa a interface IEvento
 */
export class Evento implements IEvento {
  id!: string;
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  data_inicio!: Date | null;
  data_fim!: Date | null;
  calendario!: CalendarioLetivo;
  ambiente!: Ambiente | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  /**
   * Verifica se o evento está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Cria uma nova instância de Evento
   */
  static criar(dados: IEventoCreate): Evento {
    const evento = new Evento();
    evento.nome = dados.nome ?? null;
    evento.rrule = dados.rrule;
    evento.cor = dados.cor ?? null;
    evento.data_inicio = dados.data_inicio ?? null;
    evento.data_fim = dados.data_fim ?? null;
    return evento;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IEvento): Evento {
    const evento = new Evento();
    Object.assign(evento, dados);
    return evento;
  }
}
