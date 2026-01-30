import type { IIntervaloDeTempo, IIntervaloDeTempoCreate } from "./intervalo-de-tempo.types";

/**
 * Classe de domínio que representa um Intervalo de Tempo
 * Implementa a interface IIntervaloDeTempo
 */
export class IntervaloDeTempo implements IIntervaloDeTempo {
  id!: string;
  periodoInicio!: string;
  periodoFim!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  /**
   * Cria uma nova instância de IntervaloDeTempo
   */
  static criar(dados: IIntervaloDeTempoCreate): IntervaloDeTempo {
    const intervalo = new IntervaloDeTempo();
    intervalo.periodoInicio = dados.periodoInicio;
    intervalo.periodoFim = dados.periodoFim;
    return intervalo;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IIntervaloDeTempo): IntervaloDeTempo {
    const intervalo = new IntervaloDeTempo();
    Object.assign(intervalo, dados);
    return intervalo;
  }

  /**
   * Verifica se o intervalo está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Calcula a duração do intervalo em minutos
   */
  getDuracaoEmMinutos(): number {
    const [inicioHora, inicioMin] = this.periodoInicio.split(":").map(Number);
    const [fimHora, fimMin] = this.periodoFim.split(":").map(Number);
    const inicioTotalMin = inicioHora * 60 + inicioMin;
    const fimTotalMin = fimHora * 60 + fimMin;
    return fimTotalMin - inicioTotalMin;
  }
}
