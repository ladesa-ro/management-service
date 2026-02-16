import type { Usuario } from "@/modules/@acesso/usuario/domain/usuario.domain";
import { BaseDatedEntity } from "@/modules/@shared";
import type {
  IProfessorIndisponibilidade,
  IProfessorIndisponibilidadeCreate,
  IProfessorIndisponibilidadeUpdate,
} from "./professor-indisponibilidade.types";

/**
 * Entidade de Domínio: ProfessorIndisponibilidade
 * Implementa a tipagem IProfessorIndisponibilidade e adiciona regras de negócio
 */
export class ProfessorIndisponibilidade
  extends BaseDatedEntity
  implements IProfessorIndisponibilidade
{
  perfil!: Usuario;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;

  protected static get entityName(): string {
    return "ProfessorIndisponibilidade";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = ProfessorIndisponibilidade.createValidation();
    rules.requiredNumber(this.diaDaSemana, "diaDaSemana");
    rules.range(this.diaDaSemana, "diaDaSemana", 0, 6);
    rules.required(this.horaInicio, "horaInicio");
    rules.timeFormat(this.horaInicio, "horaInicio");
    rules.required(this.horaFim, "horaFim");
    rules.timeFormat(this.horaFim, "horaFim");
    rules.required(this.motivo, "motivo");
    ProfessorIndisponibilidade.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de ProfessorIndisponibilidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IProfessorIndisponibilidadeCreate): ProfessorIndisponibilidade {
    const instance = new ProfessorIndisponibilidade();
    instance.diaDaSemana = dados.diaDaSemana;
    instance.horaInicio = dados.horaInicio;
    instance.horaFim = dados.horaFim;
    instance.motivo = dados.motivo;

    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): ProfessorIndisponibilidade {
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
    if (dados.diaDaSemana !== undefined) {
      this.diaDaSemana = dados.diaDaSemana;
    }

    if (dados.horaInicio !== undefined) {
      this.horaInicio = dados.horaInicio;
    }

    if (dados.horaFim !== undefined) {
      this.horaFim = dados.horaFim;
    }

    if (dados.motivo !== undefined) {
      this.motivo = dados.motivo;
    }

    this.touchUpdated();
    this.validar();
  }
}
