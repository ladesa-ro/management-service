import type { IImagem } from "@/modules/@base/armazenamento/imagem/domain/imagem.types";
import { BaseDatedEntity } from "@/modules/@shared";
import type { IUsuario, IUsuarioCreate, IUsuarioUpdate } from "./usuario.types";

/**
 * Entidade de Domínio: Usuario
 * Implementa a tipagem IUsuario e adiciona regras de negócio
 */
export class Usuario extends BaseDatedEntity implements IUsuario {
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: IImagem | null;
  imagemPerfil!: IImagem | null;

  protected static get entityName(): string {
    return "Usuario";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    // Campos são opcionais, sem validações obrigatórias
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Usuario
   */
  static criar(dados: IUsuarioCreate): Usuario {
    const instance = new Usuario();
    instance.nome = dados.nome?.trim() || null;
    instance.matriculaSiape = dados.matriculaSiape?.trim() || null;
    instance.email = dados.email?.trim() || null;
    instance.isSuperUser = false;
    instance.imagemCapa = null;
    instance.imagemPerfil = null;
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Usuario {
    const instance = new Usuario();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do usuário
   */
  atualizar(dados: IUsuarioUpdate): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() || null;
    }

    if (dados.matriculaSiape !== undefined) {
      this.matriculaSiape = dados.matriculaSiape?.trim() || null;
    }

    if (dados.email !== undefined) {
      this.email = dados.email?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }

  /**
   * Valida se pode ser deletado (override: super users não podem ser deletados)
   */
  override podeSerDeletado(): boolean {
    return this.isAtivo() && !this.isSuperUser;
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  temNome(): boolean {
    return this.nome !== null && this.nome.trim().length > 0;
  }

  temEmail(): boolean {
    return this.email !== null && this.email.trim().length > 0;
  }

  temMatriculaSiape(): boolean {
    return this.matriculaSiape !== null && this.matriculaSiape.trim().length > 0;
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  temImagemPerfil(): boolean {
    return this.imagemPerfil !== null;
  }
}
