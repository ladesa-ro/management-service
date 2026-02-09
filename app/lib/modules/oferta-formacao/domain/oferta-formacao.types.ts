import type { IEntityBase } from "@/modules/@shared";
import type { IModalidade } from "@/modules/modalidade";

/**
 * Interface que define a estrutura de dados de OfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IOfertaFormacao extends IEntityBase {
  /** Nome da oferta de formacao */
  nome: string;

  /** Slug para URL amigavel */
  slug: string;

  /** Modalidade associada */
  modalidade: IModalidade;
}

/**
 * Dados necessarios para criar uma oferta de formacao
 */
export interface IOfertaFormacaoCreate {
  nome: string;
  slug: string;
  modalidade?: { id: number };
}

/**
 * Dados para atualizacao de oferta de formacao
 */
export interface IOfertaFormacaoUpdate {
  nome?: string;
  slug?: string;
  modalidade?: { id: number } | null;
}
