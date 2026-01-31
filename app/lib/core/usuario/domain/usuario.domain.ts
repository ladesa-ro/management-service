import type { ScalarDateTimeString } from "@/core/@shared";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { IUsuario, IUsuarioCreate } from "./usuario.types";

/**
 * Entidade de Domínio: Usuario
 * Implementa a tipagem IUsuario e adiciona regras de negócio
 */
export class Usuario implements IUsuario {
  id!: string;
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: IImagem | null;
  imagemPerfil!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Usuario
   */
  static criar(dados: IUsuarioCreate): Usuario {
    const instance = new Usuario();
    instance.nome = dados.nome ?? null;
    instance.matriculaSiape = dados.matriculaSiape ?? null;
    instance.email = dados.email ?? null;
    instance.isSuperUser = false;
    instance.imagemCapa = null;
    instance.imagemPerfil = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IUsuario): Usuario {
    const instance = new Usuario();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se o usuário está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editado
   */
  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  /**
   * Valida se pode ser deletado
   */
  podeSerDeletado(): boolean {
    return this.isAtivo() && !this.isSuperUser;
  }

  /**
   * Verifica se tem nome
   */
  temNome(): boolean {
    return this.nome !== null && this.nome.trim().length > 0;
  }

  /**
   * Verifica se tem email
   */
  temEmail(): boolean {
    return this.email !== null && this.email.trim().length > 0;
  }

  /**
   * Verifica se tem matrícula SIAPE
   */
  temMatriculaSiape(): boolean {
    return this.matriculaSiape !== null && this.matriculaSiape.trim().length > 0;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  /**
   * Verifica se tem imagem de perfil
   */
  temImagemPerfil(): boolean {
    return this.imagemPerfil !== null;
  }
}
