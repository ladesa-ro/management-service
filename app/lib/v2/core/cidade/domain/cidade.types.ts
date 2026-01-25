import type { IEstado } from "@/v2/core/estado/domain/estado.types";

/**
 * Tipagem da entidade Cidade
 * Define a estrutura de dados sem comportamento
 */
export interface ICidade {
  /** Identificador da cidade (numérico - IBGE) */
  id: number;

  /** Nome da cidade */
  nome: string;

  /** Estado ao qual a cidade pertence */
  estado: IEstado;
}
