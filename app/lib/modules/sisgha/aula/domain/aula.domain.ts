import { BaseDatedEntity, type ScalarDate } from "@/modules/@shared";
import type { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import type { Ambiente } from "@/modules/sisgea/ambiente/domain/ambiente.domain";
import type { IntervaloDeTempo } from "@/modules/sisgha/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type { IAula, IAulaCreate, IAulaUpdate } from "./aula.types";

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

  validar(): void {
    const { result, rules } = Aula.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    Aula.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Aula
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IAulaCreate): Aula {
    const instance = new Aula();
    instance.data = dados.data;
    instance.modalidade = dados.modalidade ?? null;
    instance.ambiente = null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Aula {
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
