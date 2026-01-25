import type { IModalidade } from "@/v2/core/modalidade/domain/modalidade.types";

/**
 * Interface que define a estrutura de dados de OfertaFormacao
 * Tipagem pura sem implementação de regras
 */
export interface IOfertaFormacao {
  id: string;
  nome: string;
  slug: string;
  modalidade: IModalidade;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar uma oferta de formação
 */
export interface IOfertaFormacaoCreate {
  nome: string;
  slug: string;
  modalidade?: { id: number };
}

/**
 * Dados para atualização de oferta de formação
 */
export interface IOfertaFormacaoUpdate {
  nome?: string;
  slug?: string;
  modalidade?: { id: number } | null;
}
