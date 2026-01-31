import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { IIntervaloDeTempo, IIntervaloDeTempoCreate } from "./intervalo-de-tempo.types";

/**
 * Entidade de Domínio: IntervaloDeTempo
 * Implementa a tipagem IIntervaloDeTempo e adiciona regras de negócio
 */
export class IntervaloDeTempo extends BaseEntity implements IIntervaloDeTempo {
  id!: IdUuid;

  periodoInicio!: string;
  periodoFim!: string;

  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância de IntervaloDeTempo
   */
  static criar(dados: IIntervaloDeTempoCreate): IntervaloDeTempo {
    const instance = new IntervaloDeTempo();
    instance.periodoInicio = dados.periodoInicio;
    instance.periodoFim = dados.periodoFim;
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IIntervaloDeTempo): IntervaloDeTempo {
    const instance = new IntervaloDeTempo();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos específicos do domínio IntervaloDeTempo
  // ========================================

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
