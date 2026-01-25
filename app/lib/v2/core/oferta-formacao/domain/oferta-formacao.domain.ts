import type { IModalidade } from "@/v2/core/modalidade/domain/modalidade.types";
import type { IOfertaFormacao, IOfertaFormacaoCreate } from "./oferta-formacao.types";

/**
 * Entidade de Domínio: OfertaFormacao
 * Implementa a tipagem IOfertaFormacao e adiciona regras de negócio
 */
export class OfertaFormacao implements IOfertaFormacao {
  id!: string;
  nome!: string;
  slug!: string;
  modalidade!: IModalidade;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Valida se a oferta de formação está ativa (não deletada)
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
   * Cria uma nova instância válida de OfertaFormacao
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: IOfertaFormacaoCreate): OfertaFormacao {
    const instance = new OfertaFormacao();

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
  static fromData(dados: IOfertaFormacao): OfertaFormacao {
    const instance = new OfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }
}
