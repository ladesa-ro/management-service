import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { Diario } from "@/modules/diario/domain/diario.domain";
import type { Perfil } from "@/modules/perfil";
import type {
  IDiarioProfessor,
  IDiarioProfessorCreate,
  IDiarioProfessorUpdate,
} from "./diario-professor.types";

/**
 * Entidade de Domínio: DiarioProfessor
 * Implementa a tipagem IDiarioProfessor e adiciona regras de negócio
 */
export class DiarioProfessor extends BaseEntity implements IDiarioProfessor {
  id!: IdUuid;
  situacao!: boolean;
  diario!: Diario;
  perfil!: Perfil;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "DiarioProfessor";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de DiarioProfessor
   */
  static criar(dados: IDiarioProfessorCreate): DiarioProfessor {
    const instance = new DiarioProfessor();
    instance.situacao = dados.situacao;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDiarioProfessor): DiarioProfessor {
    const instance = new DiarioProfessor();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do diário professor
   */
  atualizar(dados: IDiarioProfessorUpdate): void {
    if (dados.situacao !== undefined) {
      this.situacao = dados.situacao;
    }

    this.dateUpdated = new Date().toISOString();
  }
}
