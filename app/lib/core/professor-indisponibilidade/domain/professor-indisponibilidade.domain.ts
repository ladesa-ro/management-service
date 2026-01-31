import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { Usuario } from "@/core/usuario/domain/usuario.domain";
import type {
  IProfessorIndisponibilidade,
  IProfessorIndisponibilidadeCreate,
  IProfessorIndisponibilidadeUpdate,
} from "./professor-indisponibilidade.types";

/**
 * Entidade de Domínio: ProfessorIndisponibilidade
 * Implementa a tipagem IProfessorIndisponibilidade e adiciona regras de negócio
 */
export class ProfessorIndisponibilidade extends BaseEntity implements IProfessorIndisponibilidade {
  id!: IdUuid;
  perfil!: Usuario;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "ProfessorIndisponibilidade";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de ProfessorIndisponibilidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IProfessorIndisponibilidadeCreate): ProfessorIndisponibilidade {
    const { result, rules } = this.createValidation();

    const instance = new ProfessorIndisponibilidade();
    instance.diaDaSemana = rules.requiredNumber(dados.diaDaSemana, "diaDaSemana");
    instance.diaDaSemana = rules.range(instance.diaDaSemana, "diaDaSemana", 0, 6);

    instance.horaInicio = rules.required(dados.horaInicio, "horaInicio");
    instance.horaInicio = rules.timeFormat(instance.horaInicio, "horaInicio");

    instance.horaFim = rules.required(dados.horaFim, "horaFim");
    instance.horaFim = rules.timeFormat(instance.horaFim, "horaFim");

    instance.motivo = rules.required(dados.motivo, "motivo");

    this.throwIfInvalid(result);

    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IProfessorIndisponibilidade): ProfessorIndisponibilidade {
    const instance = new ProfessorIndisponibilidade();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da indisponibilidade do professor
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IProfessorIndisponibilidadeUpdate): void {
    const { result, rules } = ProfessorIndisponibilidade.createValidation();

    if (dados.diaDaSemana !== undefined) {
      this.diaDaSemana = rules.requiredNumber(dados.diaDaSemana, "diaDaSemana");
      this.diaDaSemana = rules.range(this.diaDaSemana, "diaDaSemana", 0, 6);
    }

    if (dados.horaInicio !== undefined) {
      this.horaInicio = rules.required(dados.horaInicio, "horaInicio");
      this.horaInicio = rules.timeFormat(this.horaInicio, "horaInicio");
    }

    if (dados.horaFim !== undefined) {
      this.horaFim = rules.required(dados.horaFim, "horaFim");
      this.horaFim = rules.timeFormat(this.horaFim, "horaFim");
    }

    if (dados.motivo !== undefined) {
      this.motivo = rules.required(dados.motivo, "motivo");
    }

    ProfessorIndisponibilidade.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
