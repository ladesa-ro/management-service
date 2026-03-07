import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
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

/**
 * Entidade de Domínio: DiaCalendario
 * Implementa a tipagem IDiaCalendario e adiciona regras de negócio
 */
export class DiaCalendario extends BaseDatedEntity {
  private constructor(
    public data: ScalarDate,
    public tipo: string,
    public diaLetivo: boolean,
    public feriado: string,
    public diaPresencial: boolean,
    public extraCurricular: boolean,
    public calendarioId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "DiaCalendario";
  }

  static criar(dados: DiaCalendarioCreateDto): DiaCalendario {
    const instance = new DiaCalendario(
      dados.data,
      dados.tipo,
      dados.diaLetivo,
      dados.feriado,
      dados.diaPresencial,
      dados.extraCurricular,
      dados.calendario.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: DiaCalendario): DiaCalendario {
    const instance = new DiaCalendario(
      data.data,
      data.tipo,
      data.diaLetivo,
      data.feriado,
      data.diaPresencial,
      data.extraCurricular,
      data.calendarioId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = DiaCalendario.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    rules.required(this.tipo, "tipo");
    DiaCalendario.throwIfInvalid(result);
  }

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
