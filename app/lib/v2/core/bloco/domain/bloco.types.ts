import type { ICampus } from "@/v2/core/campus/domain/campus.types";

/**
 * Tipagem da entidade Bloco
 * Define a estrutura de dados sem comportamento
 */
export interface IBloco {
  /** Identificador UUID do bloco */
  id: string;

  /** Nome do bloco */
  nome: string;

  /** Código identificador do bloco */
  codigo: string;

  /** Campus ao qual o bloco pertence */
  campus: ICampus;

  /** Imagem de capa do bloco (opcional) */
  imagemCapa: { id: string } | null;

  /** Data de criação */
  dateCreated: Date;

  /** Data de atualização */
  dateUpdated: Date;

  /** Data de exclusão (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Tipagem para criação de Bloco
 */
export interface IBlocoCreate {
  nome: string;
  codigo: string;
  campus: { id: string };
}

/**
 * Tipagem para atualização de Bloco
 */
export interface IBlocoUpdate {
  nome?: string;
  codigo?: string;
}
