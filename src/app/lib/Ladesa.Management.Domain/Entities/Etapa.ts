import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type { EtapaCreateDto } from "@/Ladesa.Management.Domain/Dtos/EtapaCreateDto";
import type { EtapaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EtapaUpdateDto";

/**
 * Entidade de Domínio: Etapa
 * Implementa a tipagem IEtapa e adiciona regras de negócio
 */
export class Etapa extends BaseDatedEntity {
  private constructor(
    public dataInicio: ScalarDate,
    public dataTermino: ScalarDate,
    public numero: number | null,
    public cor: string | null,
    public calendarioId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Etapa";
  }

  static criar(dados: EtapaCreateDto): Etapa {
    const instance = new Etapa(
      dados.dataInicio,
      dados.dataTermino,
      dados.numero ?? null,
      dados.cor?.trim() || null,
      dados.calendario.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Etapa): Etapa {
    const instance = new Etapa(
      data.dataInicio,
      data.dataTermino,
      data.numero,
      data.cor,
      data.calendarioId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Etapa.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    rules.dateFormat(this.dataInicio, "dataInicio");
    rules.required(this.dataTermino, "dataTermino");
    rules.dateFormat(this.dataTermino, "dataTermino");
    Etapa.throwIfInvalid(result);
  }

  atualizar(dados: EtapaUpdateDto): void {
    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataTermino !== undefined) {
      this.dataTermino = dados.dataTermino;
    }

    if (dados.numero !== undefined) {
      this.numero = dados.numero;
    }

    if (dados.cor !== undefined) {
      this.cor = dados.cor?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }
}
