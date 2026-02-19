import type { IEndereco } from "@/modules/localidades/endereco";
import type { IdNumeric, IEntityBase } from "@/modules/@shared";

/**
 * Tipagem da entidade Campus
 * Define a estrutura de dados sem comportamento
 */
export interface ICampus extends IEntityBase {
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
    cidade: { id: IdNumeric };
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
    cidade?: { id: IdNumeric };
  };
}
