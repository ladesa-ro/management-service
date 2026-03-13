import type { IdNumeric } from "@/modules/@shared";

/**
 * Tipagem da entidade Estado
 * Define a estrutura de dados sem comportamento
 */
export interface IEstado {
  /** Identificador do estado (numérico - IBGE) */
  id: IdNumeric;

  /** Nome oficial do estado */
  nome: string;

  /** Sigla do estado (ex: SP, RJ, MG) */
  sigla: string;
}

export interface IEstadoCreate {
  /** Código IBGE do estado */
  id: IdNumeric;

  /** Nome oficial do estado */
  nome: string;

  /** Sigla do estado (2 letras maiúsculas) */
  sigla: string;
}

export interface IEstadoUpdate {
  /** Nome oficial do estado */
  nome?: string;

  /** Sigla do estado (2 letras maiúsculas) */
  sigla?: string;
}
