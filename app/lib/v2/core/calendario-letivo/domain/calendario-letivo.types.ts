import type { ICampus } from "@/v2/core/campus/domain/campus.types";
import type { IOfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.types";

/**
 * Interface que define a estrutura de dados de CalendarioLetivo
 * Tipagem pura sem implementação de regras
 */
export interface ICalendarioLetivo {
  id: string;
  nome: string;
  ano: number;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar um calendário letivo
 */
export interface ICalendarioLetivoCreate {
  nome: string;
  ano: number;
  campus: { id: string };
  ofertaFormacao?: { id: string };
}

/**
 * Dados para atualização de calendário letivo
 */
export interface ICalendarioLetivoUpdate {
  nome?: string;
  ano?: number;
  campus?: { id: string };
  ofertaFormacao?: { id: string } | null;
}
