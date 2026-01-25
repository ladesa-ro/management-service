import type { ICidade } from "@/v2/core/cidade/domain/cidade.types";

/**
 * Tipagem da entidade Endereco
 * Define a estrutura de dados sem comportamento
 */
export interface IEndereco {
  /** Identificador UUID do endereço */
  id: string;

  /** CEP do endereço */
  cep: string;

  /** Logradouro (rua, avenida, etc.) */
  logradouro: string;

  /** Número do endereço */
  numero: number;

  /** Bairro */
  bairro: string;

  /** Complemento (opcional) */
  complemento: string | null;

  /** Ponto de referência (opcional) */
  pontoReferencia: string | null;

  /** Cidade do endereço */
  cidade: ICidade;

  /** Data de criação */
  dateCreated: Date;

  /** Data de atualização */
  dateUpdated: Date;

  /** Data de exclusão (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Tipagem para criação/atualização de Endereco
 */
export interface IEnderecoInput {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade: { id: number };
}
