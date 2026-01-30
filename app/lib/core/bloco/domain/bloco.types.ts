import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { ICampus } from "@/core/campus";

/**
 * Tipagem da entidade Bloco
 * Define a estrutura de dados sem comportamento
 */
export interface IBloco {
  /** Identificador UUID do bloco */
  id: IdUuid;

  /** Nome do bloco */
  nome: string;

  /** Código identificador do bloco */
  codigo: string;

  /** Campus ao qual o bloco pertence */
  campus: ICampus;

  /** Imagem de capa do bloco (opcional) */
  imagemCapa: { id: IdUuid } | null;

  /** Data de criação */
  dateCreated: ScalarDateTimeString;

  /** Data de atualização */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusão (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
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
