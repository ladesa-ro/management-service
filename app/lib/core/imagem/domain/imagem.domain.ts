import type { IImagem, IImagemCreate } from "./imagem.types";

/**
 * Entidade de Dominio: Imagem
 * Implementa a tipagem IImagem e adiciona regras de negocio
 */
export class Imagem implements IImagem {
  id!: string;
  descricao!: string | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia de Imagem
   */
  static criar(dados: IImagemCreate): Imagem {
    const instance = new Imagem();
    instance.descricao = dados.descricao ?? null;
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;
    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IImagem): Imagem {
    const instance = new Imagem();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Valida se a imagem esta ativa (nao deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Verifica se tem descricao
   */
  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }
}
