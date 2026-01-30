import type { ICampus } from "@/core/campus";
import type { IUsuario } from "@/core/usuario";
import type { IPerfil, IPerfilCreate } from "./perfil.types";

/**
 * Entidade de Domínio: Perfil
 * Implementa a tipagem IPerfil e adiciona regras de negócio
 */
export class Perfil implements IPerfil {
  id!: string;
  ativo!: boolean;
  cargo!: string;
  campus!: ICampus;
  usuario!: IUsuario;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Perfil
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: IPerfilCreate): Perfil {
    const instance = new Perfil();

    if (!dados.cargo || dados.cargo.trim().length === 0) {
      throw new Error("Cargo é obrigatório");
    }

    instance.cargo = dados.cargo.trim();
    instance.ativo = true;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IPerfil): Perfil {
    const instance = new Perfil();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se o perfil está ativo
   */
  isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editado
   */
  podeSerEditado(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser deletado
   */
  podeSerDeletado(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Verifica se tem cargo definido
   */
  temCargo(): boolean {
    return this.cargo !== null && this.cargo.trim().length > 0;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Ativa o perfil
   */
  ativar(): void {
    this.ativo = true;
    this.dateUpdated = new Date();
  }

  /**
   * Desativa o perfil
   */
  desativar(): void {
    this.ativo = false;
    this.dateUpdated = new Date();
  }
}
