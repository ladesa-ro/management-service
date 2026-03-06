import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ReservaCreateDto } from "@/Ladesa.Management.Domain/Dtos/ReservaCreateDto";
import type { ReservaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ReservaUpdateDto";
import type { Ambiente, IAmbiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import type { IUsuario, Usuario } from "@/Ladesa.Management.Domain/Entities/Usuario";

/**
 * Interface que define a estrutura de uma Reserva
 */
export interface IReserva extends IEntityBase {
  situacao: string;
  motivo: string | null;
  tipo: string | null;
  rrule: string;
  ambiente: IAmbiente;
  usuario: IUsuario;
}

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

  /**
   * Cria uma nova instância válida de Reserva
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ReservaCreateDto): Reserva {
    const instance = new Reserva();
    instance.situacao = dados.situacao;
    instance.rrule = dados.rrule;
    instance.motivo = dados.motivo?.trim() || null;
    instance.tipo = dados.tipo?.trim() || null;

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
  static fromData(dados: Record<string, any>): Reserva {
    const instance = new Reserva();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Reserva.createValidation();
    rules.required(this.situacao, "situacao");
    rules.required(this.rrule, "rrule");
    Reserva.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da reserva
   * @throws EntityValidationError se os dados forem inválidos
   */
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
