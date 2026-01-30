import { IdNumeric } from "@/core/@shared";

/**
 * Tipagem da entidade Estado
 * Define a estrutura de dados sem comportamento
 */
export interface IEstado {
  /** Identificador do estado (numérico) */
  id: IdNumeric;

  /** Nome oficial do estado */
  nome: string;

  /** Sigla do estado (ex: SP, RJ, MG) */
  sigla: string;
}
