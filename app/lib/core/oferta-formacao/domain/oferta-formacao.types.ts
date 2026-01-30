import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IModalidade } from "@/core/modalidade";

/**
 * Interface que define a estrutura de dados de OfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IOfertaFormacao {
  /** Identificador UUID da oferta de formacao */
  id: IdUuid;

  /** Nome da oferta de formacao */
  nome: string;

  /** Slug para URL amigavel */
  slug: string;

  /** Modalidade associada */
  modalidade: IModalidade;

  /** Data de criacao */
  dateCreated: ScalarDateTimeString;

  /** Data de atualizacao */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusao (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
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
