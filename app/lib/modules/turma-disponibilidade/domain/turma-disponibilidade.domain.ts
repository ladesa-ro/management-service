import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { Disponibilidade } from "@/modules/disponibilidade/domain/disponibilidade.domain";
import type { Turma } from "@/modules/turma/domain/turma.domain";
import type {
  ITurmaDisponibilidade,
  ITurmaDisponibilidadeCreate,
} from "./turma-disponibilidade.types";

/**
 * Entidade de Domínio: TurmaDisponibilidade
 * Entidade de relacionamento N:N entre Turma e Disponibilidade
 */
export class TurmaDisponibilidade extends BaseEntity implements ITurmaDisponibilidade {
  id!: IdUuid;
  turma!: Turma;
  disponibilidade!: Disponibilidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "TurmaDisponibilidade";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de TurmaDisponibilidade
   */
  static criar(_dados: ITurmaDisponibilidadeCreate): TurmaDisponibilidade {
    const instance = new TurmaDisponibilidade();
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ITurmaDisponibilidade): TurmaDisponibilidade {
    const instance = new TurmaDisponibilidade();
    Object.assign(instance, dados);
    return instance;
  }
}
