import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { ICampus } from "@/modules/ambientes/campus";

/**
 * Tipagem da entidade Bloco
 * Define a estrutura de dados sem comportamento
 */
export interface IBloco extends IEntityBase {
  /** Nome do bloco */
  nome: string;

  /** Código identificador do bloco */
  codigo: string;

  /** Campus ao qual o bloco pertence */
  campus: ICampus;

  /** Imagem de capa do bloco (opcional) */
  imagemCapa: { id: IdUuid } | null;
}

/**
 * Tipagem para criação de Bloco
 */
export interface IBlocoCreate {
  nome: string;
  codigo: string;
  campus: { id: IdUuid };
}

/**
 * Tipagem para atualização de Bloco
 */
export interface IBlocoUpdate {
  nome?: string;
  codigo?: string;
}
