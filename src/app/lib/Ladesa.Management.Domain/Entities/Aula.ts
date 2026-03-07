import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import type { AulaCreateDto } from "@/Ladesa.Management.Domain/Dtos/AulaCreateDto";
import type { AulaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/AulaUpdateDto";

/**
 * Entidade de Domínio: Aula
 * Implementa a tipagem IAula e adiciona regras de negócio
 */
export class Aula extends BaseDatedEntity {
  private constructor(
    public data: ScalarDate,
    public modalidade: string | null,
    public intervaloDeTempoId: IdUuid,
    public diarioId: IdUuid,
    public ambienteId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Aula";
  }

  static criar(dados: AulaCreateDto): Aula {
    const instance = new Aula(
      dados.data,
      dados.modalidade ?? null,
      (dados.intervaloDeTempo as IFindOneByIdDto<IdUuid>).id,
      dados.diario.id,
      dados.ambiente?.id ?? null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Aula): Aula {
    const instance = new Aula(
      data.data,
      data.modalidade,
      data.intervaloDeTempoId,
      data.diarioId,
      data.ambienteId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Aula.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    Aula.throwIfInvalid(result);
  }

  atualizar(dados: AulaUpdateDto): void {
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    if (dados.modalidade !== undefined) {
      this.modalidade = dados.modalidade ?? null;
    }

    this.touchUpdated();
    this.validar();
  }

  temAmbiente(): boolean {
    return this.ambienteId !== null;
  }
}
