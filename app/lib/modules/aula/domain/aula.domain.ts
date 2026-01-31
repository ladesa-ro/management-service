import {
  BaseEntity,
  type IdUuid,
  type ScalarDate,
  type ScalarDateTimeString,
} from "@/modules/@shared";
import type { Ambiente } from "@/modules/ambiente/domain/ambiente.domain";
import type { Diario } from "@/modules/diario/domain/diario.domain";
import type { IntervaloDeTempo } from "@/modules/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type { IAula, IAulaCreate, IAulaUpdate } from "./aula.types";

/**
 * Entidade de Domínio: Aula
 * Implementa a tipagem IAula e adiciona regras de negócio
 */
export class Aula extends BaseEntity implements IAula {
  id!: IdUuid;
  data!: ScalarDate;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  ambiente!: Ambiente | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Aula";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Aula
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IAulaCreate): Aula {
    const { result, rules } = this.createValidation();

    const instance = new Aula();
    instance.data = rules.required(dados.data, "data");
    instance.data = rules.dateFormat(instance.data, "data");

    this.throwIfInvalid(result);

    instance.modalidade = rules.optional(dados.modalidade);
    instance.ambiente = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IAula): Aula {
    const instance = new Aula();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da aula
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IAulaUpdate): void {
    const { result, rules } = Aula.createValidation();

    if (dados.data !== undefined) {
      this.data = rules.required(dados.data, "data");
      this.data = rules.dateFormat(this.data, "data");
    }

    if (dados.modalidade !== undefined) {
      this.modalidade = rules.optional(dados.modalidade);
    }

    Aula.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
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
