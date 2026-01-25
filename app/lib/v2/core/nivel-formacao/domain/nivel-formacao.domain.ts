import type { INivelFormacao, INivelFormacaoCreate } from "./nivel-formacao.types";

/**
 * Entidade de Domínio: NivelFormacao
 * Implementa a tipagem INivelFormacao e adiciona regras de negócio
 */
export class NivelFormacao implements INivelFormacao {
  id!: string;
  slug!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Valida se o nível de formação está ativo (não deletado)
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
    return this.isAtivo();
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de NivelFormacao
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: INivelFormacaoCreate): NivelFormacao {
    const instance = new NivelFormacao();

    if (!dados.slug || dados.slug.trim().length === 0) {
      throw new Error("Slug é obrigatório");
    }

    instance.slug = dados.slug.trim();
    instance.dateCreated = new Date();
    instance.dateUpdated = new Date();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: INivelFormacao): NivelFormacao {
    const instance = new NivelFormacao();
    Object.assign(instance, dados);
    return instance;
  }
}
