import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type { IOfertaFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao";

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
