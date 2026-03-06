import type { IdNumeric, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { ICidade } from "@/Ladesa.Management.Application/localidades/cidade";

export interface IEndereco extends IEntityBase {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento: string | null;
  pontoReferencia: string | null;
  cidade: ICidade;
}

export interface IEnderecoInput {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade: { id: IdNumeric };
}

export interface IEnderecoCreate {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade: { id: IdNumeric };
}

export interface IEnderecoUpdate {
  cep?: string;
  logradouro?: string;
  numero?: number;
  bairro?: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade?: { id: IdNumeric };
}
