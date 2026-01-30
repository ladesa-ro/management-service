import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { Ambiente } from "@/core/ambiente/domain/ambiente.domain";
import type { CalendarioLetivo } from "@/core/calendario-letivo";
import type { IEvento, IEventoCreate } from "./evento.types";

/**
 * Classe de domínio que representa um Evento
 * Implementa a interface IEvento
 */
export class Evento implements IEvento {
  id!: IdUuid;
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  dataInicio!: ScalarDateTimeString | null;
  dataFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivo;
  ambiente!: Ambiente | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  /**
   * Cria uma nova instância de Evento
   */
  static criar(dados: IEventoCreate): Evento {
    const evento = new Evento();
    evento.nome = dados.nome ?? null;
    evento.rrule = dados.rrule;
    evento.cor = dados.cor ?? null;
    evento.dataInicio = dados.dataInicio ?? null;
    evento.dataFim = dados.dataFim ?? null;
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

  /**
   * Verifica se o evento está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
