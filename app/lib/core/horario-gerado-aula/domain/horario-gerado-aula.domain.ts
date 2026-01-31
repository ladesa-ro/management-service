import {
  BaseEntity,
  type IdUuid,
  type ScalarDate,
  type ScalarDateTimeString,
} from "@/core/@shared";
import type { DiarioProfessor } from "@/core/diario-professor/domain/diario-professor.domain";
import type { HorarioGerado } from "@/core/horario-gerado";
import type { IntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type {
  IHorarioGeradoAula,
  IHorarioGeradoAulaCreate,
  IHorarioGeradoAulaUpdate,
} from "./horario-gerado-aula.types";

/**
 * Entidade de Domínio: HorarioGeradoAula
 * Implementa a tipagem IHorarioGeradoAula e adiciona regras de negócio
 */
export class HorarioGeradoAula extends BaseEntity implements IHorarioGeradoAula {
  id!: IdUuid;
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessor;
  horarioGerado!: HorarioGerado;
  intervaloDeTempo!: IntervaloDeTempo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "HorarioGeradoAula";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de HorarioGeradoAula
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IHorarioGeradoAulaCreate): HorarioGeradoAula {
    const { result, rules } = this.createValidation();

    const instance = new HorarioGeradoAula();
    instance.data = rules.required(dados.data, "data");
    instance.data = rules.dateFormat(instance.data, "data");

    this.throwIfInvalid(result);

    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IHorarioGeradoAula): HorarioGeradoAula {
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
    const { result, rules } = HorarioGeradoAula.createValidation();

    if (dados.data !== undefined) {
      this.data = rules.required(dados.data, "data");
      this.data = rules.dateFormat(this.data, "data");
    }

    HorarioGeradoAula.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
