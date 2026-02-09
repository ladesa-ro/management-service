import {
  BaseEntity,
  type IdUuid,
  type ScalarDate,
  type ScalarDateTimeString,
} from "@/modules/@shared";
import type { DiarioProfessor } from "@/modules/diario-professor/domain/diario-professor.domain";
import type { HorarioGerado } from "@/modules/horario-gerado";
import type { IntervaloDeTempo } from "@/modules/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
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
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    this.touchUpdated();
    this.validar();
  }
}
