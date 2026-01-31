import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { ICampus } from "@/modules/campus";
import type { IOfertaFormacao } from "@/modules/oferta-formacao";

/**
 * Interface que define a estrutura de dados de GradeHorarioOfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IGradeHorarioOfertaFormacao {
  /** Identificador UUID da grade horario de oferta de formacao */
  id: IdUuid;

  /** Campus associado */
  campus: ICampus;

  /** Oferta de formacao associada */
  ofertaFormacao: IOfertaFormacao;

  /** Data de criacao */
  dateCreated: ScalarDateTimeString;

  /** Data de atualizacao */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusao (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Dados necessarios para criar uma grade horario de oferta de formacao
 */
export interface IGradeHorarioOfertaFormacaoCreate {
  campus: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}

/**
 * Dados para atualizacao de grade horario de oferta de formacao
 */
export interface IGradeHorarioOfertaFormacaoUpdate {
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}
