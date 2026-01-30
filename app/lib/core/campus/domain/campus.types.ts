import type { IEndereco } from "@/core/endereco";

/**
 * Tipagem da entidade Campus
 * Define a estrutura de dados sem comportamento
 */
export interface ICampus {
  /** Identificador UUID do campus */
  id: string;

  /** Nome fantasia do campus */
  nomeFantasia: string;

  /** Razão social do campus */
  razaoSocial: string;

  /** Apelido/nome curto do campus */
  apelido: string;

  /** CNPJ do campus */
  cnpj: string;

  /** Endereço do campus */
  endereco: IEndereco;

  /** Data de criação */
  dateCreated: Date;

  /** Data de atualização */
  dateUpdated: Date;

  /** Data de exclusão (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Tipagem para criação de Campus
 */
export interface ICampusCreate {
  nomeFantasia: string;
  razaoSocial: string;
  apelido: string;
  cnpj: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    complemento?: string | null;
    pontoReferencia?: string | null;
    cidade: { id: number };
  };
}

/**
 * Tipagem para atualização de Campus
 */
export interface ICampusUpdate {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: number;
    bairro?: string;
    complemento?: string | null;
    pontoReferencia?: string | null;
    cidade?: { id: number };
  };
}
