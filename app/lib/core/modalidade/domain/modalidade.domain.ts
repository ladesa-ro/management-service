import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IModalidade, IModalidadeCreate } from "./modalidade.types";

/**
 * Entidade de Dominio: Modalidade
 * Implementa a tipagem IModalidade e adiciona regras de negocio
 */
export class Modalidade implements IModalidade {
  id!: IdUuid;
  nome!: string;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Cria uma nova instancia valida de Modalidade
   * @throws Error se os dados forem invalidos
   */
  static criar(dados: IModalidadeCreate): Modalidade {
    const instance = new Modalidade();

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome e obrigatorio");
    }

    if (!dados.slug || dados.slug.trim().length === 0) {
      throw new Error("Slug e obrigatorio");
    }

    instance.nome = dados.nome.trim();
    instance.slug = dados.slug.trim();
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IModalidade): Modalidade {
    const instance = new Modalidade();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se a modalidade esta ativa (nao deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

  // ========================================
  // Factory Methods
  // ========================================

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
}
