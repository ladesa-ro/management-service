import type { IdNumeric } from "@/modules/@shared";
import type { IEstado } from "@/modules/estado";

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
