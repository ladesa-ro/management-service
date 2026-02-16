import type { Perfil } from "@/modules/@acesso/perfil";
import { BaseDatedEntity } from "@/modules/@shared";
import type { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import type {
  IDiarioProfessor,
  IDiarioProfessorCreate,
  IDiarioProfessorUpdate,
} from "./diario-professor.types";

/**
 * Entidade de Domínio: DiarioProfessor
 * Implementa a tipagem IDiarioProfessor e adiciona regras de negócio
 */
export class DiarioProfessor extends BaseDatedEntity implements IDiarioProfessor {
  situacao!: boolean;
  diario!: Diario;
  perfil!: Perfil;

  protected static get entityName(): string {
    return "DiarioProfessor";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    // Sem validações de campos escalares
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
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): DiarioProfessor {
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

    this.touchUpdated();
    this.validar();
  }
}
