import type { IEntityBase, ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type {
  HorarioGerado,
  IHorarioGerado,
} from "@/Ladesa.Management.Application/horarios/horario-gerado";
import type { HorarioGeradoAulaCreateDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaCreateDto";
import type { HorarioGeradoAulaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaUpdateDto";
import type {
  DiarioProfessor,
  IDiarioProfessor,
} from "@/Ladesa.Management.Domain/Entities/DiarioProfessor";
import type {
  IIntervaloDeTempo,
  IntervaloDeTempo,
} from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

export interface IHorarioGeradoAula extends IEntityBase {
  data: ScalarDateTimeString;
  diarioProfessor: IDiarioProfessor;
  horarioGerado: IHorarioGerado;
  intervaloDeTempo: IIntervaloDeTempo;
}

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

  /**
   * Cria uma nova instância válida de HorarioGeradoAula
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: HorarioGeradoAulaCreateDto): HorarioGeradoAula {
    const instance = new HorarioGeradoAula();
    instance.data = dados.data;
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
  static fromData(dados: Record<string, any>): HorarioGeradoAula {
    const instance = new HorarioGeradoAula();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = HorarioGeradoAula.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    HorarioGeradoAula.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do horário gerado aula
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: HorarioGeradoAulaUpdateDto): void {
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    this.touchUpdated();
    this.validar();
  }
}
