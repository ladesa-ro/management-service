import { BaseDatedEntity, type ScalarDate } from "@/modules/@shared";
import type { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import type { HorarioGerado } from "@/modules/sisgha/horario-gerado";
import type { IntervaloDeTempo } from "@/modules/sisgha/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type {
  IHorarioGeradoAula,
  IHorarioGeradoAulaCreate,
  IHorarioGeradoAulaUpdate,
} from "./horario-gerado-aula.types";

/**
 * Entidade de Domínio: HorarioGeradoAula
 * Implementa a tipagem IHorarioGeradoAula e adiciona regras de negócio
 */
export class HorarioGeradoAula extends BaseDatedEntity implements IHorarioGeradoAula {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessor;
  horarioGerado!: HorarioGerado;
  intervaloDeTempo!: IntervaloDeTempo;

  protected static get entityName(): string {
    return "HorarioGeradoAula";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = HorarioGeradoAula.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    HorarioGeradoAula.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de HorarioGeradoAula
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IHorarioGeradoAulaCreate): HorarioGeradoAula {
    const instance = new HorarioGeradoAula();
    instance.data = dados.data;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): HorarioGeradoAula {
    const instance = new HorarioGeradoAula();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do horário gerado aula
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IHorarioGeradoAulaUpdate): void {
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    this.touchUpdated();
    this.validar();
  }
}
