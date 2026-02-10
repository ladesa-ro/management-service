import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { ICampus } from "@/modules/campus";
import type { IOfertaFormacao } from "@/modules/oferta-formacao";

/**
 * Interface que define a estrutura de dados de CalendarioLetivo
 * Tipagem pura sem implementacao de regras
 */
export interface ICalendarioLetivo extends IEntityBase {
  nome: string;
  ano: number;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao | null;
}

/**
 * Dados necessarios para criar um calendario letivo
 */
export interface ICalendarioLetivoCreate {
  nome: string;
  ano: number;
  campus: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}

/**
 * Dados para atualizacao de calendario letivo
 */
export interface ICalendarioLetivoUpdate {
  nome?: string;
  ano?: number;
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid } | null;
}
