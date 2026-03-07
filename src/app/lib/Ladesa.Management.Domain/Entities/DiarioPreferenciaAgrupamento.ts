import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type { DiarioPreferenciaAgrupamentoCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioPreferenciaAgrupamentoCreateDto";
import type { DiarioPreferenciaAgrupamentoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioPreferenciaAgrupamentoUpdateDto";

/**
 * Entidade de Domínio: DiarioPreferenciaAgrupamento
 * Implementa a tipagem IDiarioPreferenciaAgrupamento e adiciona regras de negócio
 */
export class DiarioPreferenciaAgrupamento extends BaseDatedEntity {
  private constructor(
    public dataInicio: ScalarDate,
    public dataFim: ScalarDate | null,
    public diaSemanaIso: number,
    public aulasSeguidas: number,
    public intervaloDeTempoId: IdUuid,
    public diarioId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "DiarioPreferenciaAgrupamento";
  }

  static criar(dados: DiarioPreferenciaAgrupamentoCreateDto): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento(
      dados.dataInicio,
      dados.dataFim ?? null,
      dados.diaSemanaIso,
      dados.aulasSeguidas,
      dados.intervaloDeTempo.id,
      dados.diario.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: DiarioPreferenciaAgrupamento): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento(
      data.dataInicio,
      data.dataFim,
      data.diaSemanaIso,
      data.aulasSeguidas,
      data.intervaloDeTempoId,
      data.diarioId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = DiarioPreferenciaAgrupamento.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    rules.dateFormat(this.dataInicio, "dataInicio");
    rules.requiredNumber(this.diaSemanaIso, "diaSemanaIso");
    rules.range(this.diaSemanaIso, "diaSemanaIso", 1, 7);
    rules.requiredNumber(this.aulasSeguidas, "aulasSeguidas");
    rules.min(this.aulasSeguidas, "aulasSeguidas", 1);
    DiarioPreferenciaAgrupamento.throwIfInvalid(result);
  }

  atualizar(dados: DiarioPreferenciaAgrupamentoUpdateDto): void {
    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    if (dados.diaSemanaIso !== undefined) {
      this.diaSemanaIso = dados.diaSemanaIso;
    }

    if (dados.aulasSeguidas !== undefined) {
      this.aulasSeguidas = dados.aulasSeguidas;
    }

    this.touchUpdated();
    this.validar();
  }
}
