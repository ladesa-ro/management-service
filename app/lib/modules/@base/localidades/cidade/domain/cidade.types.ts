import type { IEstado } from "@/modules/@base/localidades/estado";
import type { IdNumeric } from "@/modules/@shared";

/**
 * Tipagem da entidade Cidade
 * Define a estrutura de dados sem comportamento
 */
export interface ICidade {
  /** Identificador da cidade (numérico - IBGE) */
  id: IdNumeric;

  /** Nome da cidade */
  nome: string;

  /** Estado ao qual a cidade pertence */
  estado: IEstado;
}

export interface ICidadeCreate {
  /** Código IBGE da cidade */
  id: IdNumeric;

  /** Nome da cidade */
  nome: string;

  /** Estado ao qual a cidade pertence */
  estado: { id: IdNumeric };
}

export interface ICidadeUpdate {
  /** Nome da cidade */
  nome?: string;

  /** Estado ao qual a cidade pertence */
  estado?: { id: IdNumeric };
}
