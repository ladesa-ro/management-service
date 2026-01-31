import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";
import type { IUsuario, IUsuarioCreate, IUsuarioUpdate } from "./usuario.types";

/**
 * Entidade de Domínio: Usuario
 * Implementa a tipagem IUsuario e adiciona regras de negócio
 */
export class Usuario extends BaseEntity implements IUsuario {
  id!: IdUuid;
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: IImagem | null;
  imagemPerfil!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Usuario";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Usuario
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IUsuarioCreate): Usuario {
    const { rules } = this.createValidation();

    const instance = new Usuario();
    instance.nome = rules.optional(dados.nome);
    instance.matriculaSiape = rules.optional(dados.matriculaSiape);
    instance.email = rules.optional(dados.email);
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

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do usuário
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IUsuarioUpdate): void {
    const { rules } = Usuario.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.optional(dados.nome);
    }

    if (dados.matriculaSiape !== undefined) {
      this.matriculaSiape = rules.optional(dados.matriculaSiape);
    }

    if (dados.email !== undefined) {
      this.email = rules.optional(dados.email);
    }

    this.dateUpdated = new Date().toISOString();
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
