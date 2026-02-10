import { BaseDatedEntity, type ScalarDateTimeString } from "@/modules/@shared";
import type { CalendarioLetivo } from "@/modules/calendario-letivo";
import type {
  IHorarioGerado,
  IHorarioGeradoCreate,
  IHorarioGeradoUpdate,
} from "./horario-gerado.types";

/**
 * Entidade de Domínio: HorarioGerado
 * Implementa a tipagem IHorarioGerado e adiciona regras de negócio
 */
export class HorarioGerado extends BaseDatedEntity implements IHorarioGerado {
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: ScalarDateTimeString | null;
  vigenciaInicio!: ScalarDateTimeString | null;
  vigenciaFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivo;

  protected static get entityName(): string {
    return "HorarioGerado";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    // Campos são opcionais, sem validações obrigatórias
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de HorarioGerado
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IHorarioGeradoCreate): HorarioGerado {
    const instance = new HorarioGerado();
    instance.status = dados.status?.trim() || null;
    instance.tipo = dados.tipo?.trim() || null;
    instance.dataGeracao = dados.dataGeracao ?? null;
    instance.vigenciaInicio = dados.vigenciaInicio ?? null;
    instance.vigenciaFim = dados.vigenciaFim ?? null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): HorarioGerado {
    const instance = new HorarioGerado();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do horário gerado
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IHorarioGeradoUpdate): void {
    if (dados.status !== undefined) {
      this.status = dados.status?.trim() || null;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo?.trim() || null;
    }

    if (dados.dataGeracao !== undefined) {
      this.dataGeracao = dados.dataGeracao;
    }

    if (dados.vigenciaInicio !== undefined) {
      this.vigenciaInicio = dados.vigenciaInicio;
    }

    if (dados.vigenciaFim !== undefined) {
      this.vigenciaFim = dados.vigenciaFim;
    }

    this.touchUpdated();
    this.validar();
  }
}
