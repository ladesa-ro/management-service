import type { IEntityBase } from "@/modules/@shared";

/**
 * Interface que define a estrutura de dados de Empresa
 * Tipagem pura sem implementação de regras
 */
export interface IEmpresa extends IEntityBase {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
  ativo?: boolean;
}

/**
 * Dados necessários para criar uma empresa
 */
export interface IEmpresaCreate {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
}

/**
 * Dados para atualização de empresa
 */
export interface IEmpresaUpdate {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  idEnderecoFk?: string;
}
