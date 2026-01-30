import type { ICampus } from "@/core/campus";
import type { IOfertaFormacao } from "@/core/oferta-formacao";
import { IdUuid, ScalarDateTimeString } from "@/core/@shared";

/**
 * Interface que define a estrutura de dados de CalendarioLetivo
 * Tipagem pura sem implementacao de regras
 */
export interface ICalendarioLetivo {
  id: IdUuid;
  nome: string;
  ano: number;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Dados necessarios para criar um calendario letivo
 */
export interface ICalendarioLetivoCreate {
  nome: string;
  ano: number;
  campus: { id: string };
  ofertaFormacao?: { id: string };
}

/**
 * Dados para atualizacao de calendario letivo
 */
export interface ICalendarioLetivoUpdate {
  nome?: string;
  ano?: number;
  campus?: { id: string };
  ofertaFormacao?: { id: string } | null;
}
