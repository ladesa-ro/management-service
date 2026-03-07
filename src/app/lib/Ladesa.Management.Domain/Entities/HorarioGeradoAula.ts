import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type { HorarioGeradoAulaCreateDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaCreateDto";
import type { HorarioGeradoAulaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaUpdateDto";

/**
 * Entidade de Domínio: HorarioGeradoAula
 * Implementa a tipagem IHorarioGeradoAula e adiciona regras de negócio
 */
export class HorarioGeradoAula extends BaseDatedEntity {
  private constructor(
    public data: ScalarDate,
    public diarioProfessorId: IdUuid,
    public horarioGeradoId: IdUuid,
    public intervaloDeTempoId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "HorarioGeradoAula";
  }

  static criar(dados: HorarioGeradoAulaCreateDto): HorarioGeradoAula {
    const instance = new HorarioGeradoAula(
      dados.data,
      dados.diarioProfessor.id,
      dados.horarioGerado.id,
      dados.intervaloDeTempo.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: HorarioGeradoAula): HorarioGeradoAula {
    const instance = new HorarioGeradoAula(
      data.data,
      data.diarioProfessorId,
      data.horarioGeradoId,
      data.intervaloDeTempoId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = HorarioGeradoAula.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    HorarioGeradoAula.throwIfInvalid(result);
  }

  atualizar(dados: HorarioGeradoAulaUpdateDto): void {
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    this.touchUpdated();
    this.validar();
  }
}
