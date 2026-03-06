import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { UsuarioCreateDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioCreateDto";
import type { UsuarioUpdateDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioUpdateDto";
import type { IImagem } from "@/Ladesa.Management.Domain/Entities/Imagem";

/**
 * Interface que define a estrutura de dados de Usuario
 * Tipagem pura sem implementação de regras
 */
export interface IUsuario extends IEntityBase {
  nome: string | null;
  matriculaSiape: string | null;
  email: string | null;
  isSuperUser: boolean;
  imagemCapa: IImagem | null;
  imagemPerfil: IImagem | null;
}

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

  /**
   * Cria uma nova instância válida de Usuario
   */
  static criar(dados: UsuarioCreateDto): Usuario {
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

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Usuario {
    const instance = new Usuario();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Campos são opcionais, sem validações obrigatórias
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do usuário
   */
  atualizar(dados: UsuarioUpdateDto): void {
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
