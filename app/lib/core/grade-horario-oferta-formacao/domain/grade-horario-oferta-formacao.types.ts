import type { ICampus } from "@/core/campus";
import type { IOfertaFormacao } from "@/core/oferta-formacao";

/**
 * Interface que define a estrutura de dados de GradeHorarioOfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IGradeHorarioOfertaFormacao {
  /** Identificador UUID da grade horario de oferta de formacao */
  id: string;

  /** Campus associado */
  campus: ICampus;

  /** Oferta de formacao associada */
  ofertaFormacao: IOfertaFormacao;

  /** Data de criacao */
  dateCreated: Date;

  /** Data de atualizacao */
  dateUpdated: Date;

  /** Data de exclusao (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Dados necessarios para criar uma grade horario de oferta de formacao
 */
export interface IGradeHorarioOfertaFormacaoCreate {
  campus: { id: string };
  ofertaFormacao: { id: string };
}

/**
 * Dados para atualizacao de grade horario de oferta de formacao
 */
export interface IGradeHorarioOfertaFormacaoUpdate {
  campus?: { id: string };
  ofertaFormacao?: { id: string };
}
