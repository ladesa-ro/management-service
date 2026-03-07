import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ReservaCreateDto } from "@/Ladesa.Management.Domain/Dtos/ReservaCreateDto";
import type { ReservaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ReservaUpdateDto";

/**
 * Entidade de Domínio: Reserva
 * Implementa a tipagem IReserva e adiciona regras de negócio
 */
export class Reserva extends BaseDatedEntity {
  private constructor(
    public situacao: string,
    public rrule: string,
    public motivo: string | null,
    public tipo: string | null,
    public ambienteId: IdUuid,
    public usuarioId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Reserva";
  }

  static criar(dados: ReservaCreateDto): Reserva {
    const instance = new Reserva(
      dados.situacao,
      dados.rrule,
      dados.motivo?.trim() || null,
      dados.tipo?.trim() || null,
      dados.ambiente.id,
      dados.usuario.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Reserva): Reserva {
    const instance = new Reserva(
      data.situacao,
      data.rrule,
      data.motivo,
      data.tipo,
      data.ambienteId,
      data.usuarioId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Reserva.createValidation();
    rules.required(this.situacao, "situacao");
    rules.required(this.rrule, "rrule");
    Reserva.throwIfInvalid(result);
  }

  atualizar(dados: ReservaUpdateDto): void {
    if (dados.situacao !== undefined) {
      this.situacao = dados.situacao;
    }

    if (dados.rrule !== undefined) {
      this.rrule = dados.rrule;
    }

    if (dados.motivo !== undefined) {
      this.motivo = dados.motivo ?? null;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo ?? null;
    }

    this.touchUpdated();
    this.validar();
  }
}
