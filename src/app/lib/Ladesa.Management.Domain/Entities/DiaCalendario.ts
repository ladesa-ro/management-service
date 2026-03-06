import type { IEntityBase, ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type {
  CalendarioLetivo,
  ICalendarioLetivo,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type { DiaCalendarioCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioCreateDto";
import type { DiaCalendarioUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioUpdateDto";

export const TIPO_DIA_CALENDARIO_VALUES = [
  "Aula Presencial",
  "Aula Não Presencial (Letiva)",
  "Feriado",
  "Sábado",
  "Domingo",
  "Outro",
] as const;

export type TipoDiaCalendario = (typeof TIPO_DIA_CALENDARIO_VALUES)[number];

export interface IDiaCalendario extends IEntityBase {
  data: ScalarDateTimeString;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: ICalendarioLetivo;
}

/**
 * Entidade de Domínio: DiaCalendario
 * Implementa a tipagem IDiaCalendario e adiciona regras de negócio
 */
export class DiaCalendario extends BaseDatedEntity implements IDiaCalendario {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivo;

  protected static get entityName(): string {
    return "DiaCalendario";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de DiaCalendario
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: DiaCalendarioCreateDto): DiaCalendario {
    const instance = new DiaCalendario();
    instance.data = dados.data;
    instance.tipo = dados.tipo;
    instance.diaLetivo = dados.diaLetivo;
    instance.feriado = dados.feriado;
    instance.diaPresencial = dados.diaPresencial;
    instance.extraCurricular = dados.extraCurricular;
    instance.initDates();
    instance.validar();

    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): DiaCalendario {
    const instance = new DiaCalendario();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = DiaCalendario.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    rules.required(this.tipo, "tipo");
    DiaCalendario.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do dia do calendário
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: DiaCalendarioUpdateDto): void {
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo;
    }

    if (dados.diaLetivo !== undefined) {
      this.diaLetivo = dados.diaLetivo;
    }

    if (dados.feriado !== undefined) {
      this.feriado = dados.feriado;
    }

    if (dados.diaPresencial !== undefined) {
      this.diaPresencial = dados.diaPresencial;
    }

    if (dados.extraCurricular !== undefined) {
      this.extraCurricular = dados.extraCurricular;
    }

    this.touchUpdated();
    this.validar();
  }
}
