import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { IPerfil, Perfil } from "@/Ladesa.Management.Application/acesso/perfil";
import type { DiarioProfessorCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorCreateDto";
import type { DiarioProfessorUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorUpdateDto";
import type { Diario, IDiario } from "@/Ladesa.Management.Domain/Entities/Diario";

export interface IDiarioProfessor extends IEntityBase {
  situacao: boolean;
  diario: IDiario;
  perfil: IPerfil;
}

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

  /**
   * Cria uma nova instância válida de DiarioProfessor
   */
  static criar(dados: DiarioProfessorCreateDto): DiarioProfessor {
    const instance = new DiarioProfessor();
    instance.situacao = dados.situacao;
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
  static fromData(dados: Record<string, any>): DiarioProfessor {
    const instance = new DiarioProfessor();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Sem validações de campos escalares
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do diário professor
   */
  atualizar(dados: DiarioProfessorUpdateDto): void {
    if (dados.situacao !== undefined) {
      this.situacao = dados.situacao;
    }

    this.touchUpdated();
    this.validar();
  }
}
