import type { IImagem, IImagemCreate } from "./imagem.types";

/**
 * Entidade de Domínio: Imagem
 * Implementa a tipagem IImagem e adiciona regras de negócio
 */
export class Imagem implements IImagem {
  id!: string;
  descricao!: string | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Valida se a imagem está ativa (não deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Verifica se tem descrição
   */
  temDescricao(): boolean {
    return this.descricao !== null && this.descricao.trim().length > 0;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância de Imagem
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
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IImagem): Imagem {
    const instance = new Imagem();
    Object.assign(instance, dados);
    return instance;
  }
}
