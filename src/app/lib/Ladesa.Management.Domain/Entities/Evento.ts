import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import {
  BaseDatedEntity,
  type ScalarDateTimeString,
} from "@/Ladesa.Management.Application/@shared";
import type { EventoCreateDto } from "@/Ladesa.Management.Domain/Dtos/EventoCreateDto";
import type { EventoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EventoUpdateDto";

/**
 * Entidade de Domínio: Evento
 * Implementa a tipagem IEvento e adiciona regras de negócio
 */
export class Evento extends BaseDatedEntity {
  private constructor(
    public rrule: string,
    public nome: string | null,
    public cor: string | null,
    public dataInicio: ScalarDateTimeString | null,
    public dataFim: ScalarDateTimeString | null,
    public calendarioId: IdUuid,
    public ambienteId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Evento";
  }

  static criar(dados: EventoCreateDto): Evento {
    const instance = new Evento(
      dados.rrule?.trim() ?? "",
      dados.nome?.trim() || null,
      dados.cor?.trim() || null,
      dados.dataInicio ?? null,
      dados.dataFim ?? null,
      dados.calendario.id,
      dados.ambiente?.id ?? null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Evento): Evento {
    const instance = new Evento(
      data.rrule,
      data.nome,
      data.cor,
      data.dataInicio,
      data.dataFim,
      data.calendarioId,
      data.ambienteId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Evento.createValidation();
    rules.required(this.rrule, "rrule");
    Evento.throwIfInvalid(result);
  }

  atualizar(dados: EventoUpdateDto): void {
    if (dados.rrule !== undefined) {
      this.rrule = dados.rrule?.trim() ?? "";
    }

    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() || null;
    }

    if (dados.cor !== undefined) {
      this.cor = dados.cor?.trim() || null;
    }

    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    this.touchUpdated();
    this.validar();
  }
}
