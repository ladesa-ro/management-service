import type { IModalidade, IModalidadeCreate } from "./modalidade.types";

/**
 * Entidade de Domínio: Modalidade
 * Implementa a tipagem IModalidade e adiciona regras de negócio
 */
export class Modalidade implements IModalidade {
  id!: string;
  nome!: string;
  slug!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Valida se a modalidade está ativa (não deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editada
   */
  podeSerEditada(): boolean {
    return this.isAtiva();
  }

  /**
   * Valida se pode ser deletada
   */
  podeSerDeletada(): boolean {
    return this.isAtiva();
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Modalidade
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: IModalidadeCreate): Modalidade {
    const instance = new Modalidade();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.slug || dados.slug.trim().length === 0) {
      throw new Error("Slug é obrigatório");
    }

    instance.nome = dados.nome.trim();
    instance.slug = dados.slug.trim();
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IModalidade): Modalidade {
    const instance = new Modalidade();
    Object.assign(instance, dados);
    return instance;
  }
}
