import { BaseDatedEntity } from "@/modules/@shared";
import type { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import type { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import type { IReserva, IReservaCreate, IReservaUpdate } from "./reserva.types";

/**
 * Entidade de Domínio: Reserva
 * Implementa a tipagem IReserva e adiciona regras de negócio
 */
export class Reserva extends BaseDatedEntity implements IReserva {
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: Ambiente;
  usuario!: Usuario;

  protected static get entityName(): string {
    return "Reserva";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Reserva.createValidation();
    rules.required(this.situacao, "situacao");
    rules.required(this.rrule, "rrule");
    Reserva.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Reserva
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IReservaCreate): Reserva {
    const instance = new Reserva();
    instance.situacao = dados.situacao;
    instance.rrule = dados.rrule;
    instance.motivo = dados.motivo?.trim() || null;
    instance.tipo = dados.tipo?.trim() || null;

    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Reserva {
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
