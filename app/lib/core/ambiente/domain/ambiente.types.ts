import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IBloco } from "@/core/bloco";

/**
 * Tipagem da entidade Ambiente
 * Define a estrutura de dados sem comportamento
 */
export interface IAmbiente {
  /** Identificador UUID do ambiente */
  id: IdUuid;

  /** Nome do ambiente */
  nome: string;

  /** Descrição do ambiente (opcional) */
  descricao: string | null;

  /** Código identificador do ambiente */
  codigo: string;

  /** Capacidade de pessoas do ambiente (opcional) */
  capacidade: number | null;

  /** Tipo do ambiente (sala, laboratório, etc.) */
  tipo: string | null;

  /** Bloco ao qual o ambiente pertence */
  bloco: IBloco;

  /** Imagem de capa do ambiente (opcional) */
  imagemCapa: { id: IdUuid } | null;

  /** Data de criação */
  dateCreated: ScalarDateTimeString;

  /** Data de atualização */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusão (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Tipagem para criação de Ambiente
 */
export interface IAmbienteCreate {
  nome: string;
  descricao?: string | null;
  codigo: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco: { id: IdUuid };
}

/**
 * Tipagem para atualização de Ambiente
 */
export interface IAmbienteUpdate {
  nome?: string;
  descricao?: string | null;
  codigo?: string;
  capacidade?: number | null;
  tipo?: string | null;
}
