import type { IEntityBase, ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type { AulaCreateDto } from "@/Ladesa.Management.Domain/Dtos/AulaCreateDto";
import type { AulaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/AulaUpdateDto";
import type { Ambiente, IAmbiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import type { Diario, IDiario } from "@/Ladesa.Management.Domain/Entities/Diario";
import type {
  IIntervaloDeTempo,
  IntervaloDeTempo,
} from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

/**
 * Interface que define a estrutura de uma Aula
 */
export interface IAula extends IEntityBase {
  data: ScalarDateTimeString;
  modalidade: string | null;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
  ambiente: IAmbiente | null;
}

/**
 * Entidade de Domínio: Aula
 * Implementa a tipagem IAula e adiciona regras de negócio
 */
export class Aula extends BaseDatedEntity implements IAula {
  data!: ScalarDate;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  ambiente!: Ambiente | null;

  protected static get entityName(): string {
    return "Aula";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Aula
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: AulaCreateDto): Aula {
    const instance = new Aula();
    instance.data = dados.data;
    instance.modalidade = dados.modalidade ?? null;
    instance.ambiente = null;
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
  static fromData(dados: Record<string, any>): Aula {
    const instance = new Aula();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Aula.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    Aula.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da aula
   * @throws EntityValidationError se os dados forem inválidos
   */
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

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  /**
   * Verifica se a aula tem ambiente associado
   */
  temAmbiente(): boolean {
    return this.ambiente !== null;
  }
}
