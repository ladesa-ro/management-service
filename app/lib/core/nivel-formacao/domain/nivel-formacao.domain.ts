import { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { INivelFormacao, INivelFormacaoCreate } from "./nivel-formacao.types";

/**
 * Entidade de Dominio: NivelFormacao
 * Implementa a tipagem INivelFormacao e adiciona regras de negocio
 */
export class NivelFormacao implements INivelFormacao {
  id!: IdUuid;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia valida de NivelFormacao
   * @throws Error se os dados forem invalidos
   */
  static criar(dados: INivelFormacaoCreate): NivelFormacao {
    const instance = new NivelFormacao();

    if (!dados.slug || dados.slug.trim().length === 0) {
      throw new Error("Slug e obrigatorio");
    }

    instance.slug = dados.slug.trim();
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: INivelFormacao): NivelFormacao {
    const instance = new NivelFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Valida se o nivel de formacao esta ativo (nao deletado)
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
}
