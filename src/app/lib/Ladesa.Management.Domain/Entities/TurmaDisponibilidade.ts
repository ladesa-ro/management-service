import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { TurmaDisponibilidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/TurmaDisponibilidadeCreateDto";
import type {
  Disponibilidade,
  IDisponibilidade,
} from "@/Ladesa.Management.Domain/Entities/Disponibilidade";
import type { ITurma, Turma } from "@/Ladesa.Management.Domain/Entities/Turma";

export interface ITurmaDisponibilidade extends IEntityBase {
  turma: ITurma | null;
  disponibilidade: IDisponibilidade | null;
}

/**
 * Entidade de Domínio: TurmaDisponibilidade
 * Entidade de relacionamento N:N entre Turma e Disponibilidade
 */
export class TurmaDisponibilidade extends BaseDatedEntity implements ITurmaDisponibilidade {
  turma!: Turma;
  disponibilidade!: Disponibilidade;

  protected static get entityName(): string {
    return "TurmaDisponibilidade";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de TurmaDisponibilidade
   */
  static criar(_dados: TurmaDisponibilidadeCreateDto): TurmaDisponibilidade {
    const instance = new TurmaDisponibilidade();
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
  static fromData(dados: Record<string, any>): TurmaDisponibilidade {
    const instance = new TurmaDisponibilidade();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }
}
