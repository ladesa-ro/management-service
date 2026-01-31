import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { Ambiente } from "@/modules/ambiente/domain/ambiente.domain";
import type { Usuario } from "@/modules/usuario/domain/usuario.domain";
import type { IReserva, IReservaCreate, IReservaUpdate } from "./reserva.types";

/**
 * Entidade de Domínio: Reserva
 * Implementa a tipagem IReserva e adiciona regras de negócio
 */
export class Reserva extends BaseEntity implements IReserva {
  id!: IdUuid;
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: Ambiente;
  usuario!: Usuario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Reserva";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Reserva
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IReservaCreate): Reserva {
    const { result, rules } = this.createValidation();

    const instance = new Reserva();
    instance.situacao = rules.required(dados.situacao, "situacao");
    instance.rrule = rules.required(dados.rrule, "rrule");

    this.throwIfInvalid(result);

    instance.motivo = rules.optional(dados.motivo);
    instance.tipo = rules.optional(dados.tipo);
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IReserva): Reserva {
    const instance = new Reserva();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da reserva
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IReservaUpdate): void {
    const { result, rules } = Reserva.createValidation();

    if (dados.situacao !== undefined) {
      this.situacao = rules.required(dados.situacao, "situacao");
    }

    if (dados.rrule !== undefined) {
      this.rrule = rules.required(dados.rrule, "rrule");
    }

    if (dados.motivo !== undefined) {
      this.motivo = rules.optional(dados.motivo);
    }

    if (dados.tipo !== undefined) {
      this.tipo = rules.optional(dados.tipo);
    }

    Reserva.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
