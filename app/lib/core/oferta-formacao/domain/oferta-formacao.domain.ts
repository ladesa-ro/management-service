import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { IModalidade } from "@/core/modalidade";
import type { IOfertaFormacao, IOfertaFormacaoCreate } from "./oferta-formacao.types";

/**
 * Entidade de Dominio: OfertaFormacao
 * Implementa a tipagem IOfertaFormacao e adiciona regras de negocio
 */
export class OfertaFormacao extends BaseEntity implements IOfertaFormacao {
  id!: IdUuid;
  nome!: string;
  slug!: string;
  modalidade!: IModalidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Metodos de Dominio
  // ========================================

  /**
   * Cria uma nova instancia valida de OfertaFormacao
   * @throws Error se os dados forem invalidos
   */
  static criar(dados: IOfertaFormacaoCreate): OfertaFormacao {
    const instance = new OfertaFormacao();

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
  static fromData(dados: IOfertaFormacao): OfertaFormacao {
    const instance = new OfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }

}
