import { BaseDatedEntity } from "@/modules/@shared";
import type { IEstagiario, IEstagiarioCreate, IEstagiarioUpdate } from "./estagiario.types";

/**
 * Entidade de Domínio: Estagiario
 * Implementa a tipagem IEstagiario e adiciona regras de negócio
 */
export class Estagiario extends BaseDatedEntity implements IEstagiario {
  idPerfilFk!: string;
  idCursoFk!: string;
  idTurmaFk!: string;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;

  static get entityName(): string {
    return "Estagiario";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Valida os dados do estagiário
   */
  validar(): void {
    if (!this.idPerfilFk || this.idPerfilFk.trim().length === 0) {
      throw new Error("Perfil do estagiário é obrigatório");
    }

    if (!this.idCursoFk || this.idCursoFk.trim().length === 0) {
      throw new Error("Curso do estagiário é obrigatório");
    }

    if (!this.idTurmaFk || this.idTurmaFk.trim().length === 0) {
      throw new Error("Turma do estagiário é obrigatória");
    }

    if (!this.telefone || this.telefone.trim().length === 0) {
      throw new Error("Telefone do estagiário é obrigatório");
    }

    if (this.telefone.length > 15) {
      throw new Error("Telefone deve ter no máximo 15 caracteres");
    }

    if (!this.dataNascimento || this.dataNascimento.trim().length === 0) {
      throw new Error("Data de nascimento do estagiário é obrigatória");
    }

    if (!this.validarData(this.dataNascimento)) {
      throw new Error("Data de nascimento inválida");
    }
  }

  /**
   * Valida formato de data (básico)
   */
  private validarData(data: string): boolean {
    const dateObj = new Date(data);
    return !isNaN(dateObj.getTime());
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Estagiario
   */
  static criar(dados: IEstagiarioCreate): Estagiario {
    const instance = new Estagiario();
    instance.idPerfilFk = dados.idPerfilFk.trim();
    instance.idCursoFk = dados.idCursoFk.trim();
    instance.idTurmaFk = dados.idTurmaFk.trim();
    instance.telefone = dados.telefone.trim();
    instance.emailInstitucional = dados.emailInstitucional?.trim() || null;
    instance.dataNascimento = dados.dataNascimento.trim();
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Estagiario {
    const instance = new Estagiario();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Atualiza os dados do estagiário
   */
  atualizar(dados: IEstagiarioUpdate): void {
    if (dados.idPerfilFk !== undefined) {
      this.idPerfilFk = dados.idPerfilFk.trim();
    }

    if (dados.idCursoFk !== undefined) {
      this.idCursoFk = dados.idCursoFk.trim();
    }

    if (dados.idTurmaFk !== undefined) {
      this.idTurmaFk = dados.idTurmaFk.trim();
    }

    if (dados.telefone !== undefined) {
      this.telefone = dados.telefone.trim();
    }

    if (dados.emailInstitucional !== undefined) {
      this.emailInstitucional = dados.emailInstitucional.trim();
    }

    if (dados.dataNascimento !== undefined) {
      this.dataNascimento = dados.dataNascimento.trim();
    }

    this.touchUpdated();
    this.validar();
  }

  /**
   * Propriedade ativa (baseada no soft delete)
   */
  get ativo(): boolean {
    return this.isAtivo();
  }
}
