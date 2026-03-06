import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ProfessorIndisponibilidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeCreateDto";
import type { ProfessorIndisponibilidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeUpdateDto";
import type { IUsuario, Usuario } from "@/Ladesa.Management.Domain/Entities/Usuario";

export interface IProfessorIndisponibilidade extends IEntityBase {
  perfil: IUsuario;
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  motivo: string;
}

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

  /**
   * Cria uma nova instância válida de ProfessorIndisponibilidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ProfessorIndisponibilidadeCreateDto): ProfessorIndisponibilidade {
    const instance = new ProfessorIndisponibilidade();
    instance.diaDaSemana = dados.diaDaSemana;
    instance.horaInicio = dados.horaInicio;
    instance.horaFim = dados.horaFim;
    instance.motivo = dados.motivo;

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
  static fromData(dados: Record<string, any>): ProfessorIndisponibilidade {
    const instance = new ProfessorIndisponibilidade();
    Object.assign(instance, dados);
    return instance;
  }

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
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da indisponibilidade do professor
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: ProfessorIndisponibilidadeUpdateDto): void {
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
