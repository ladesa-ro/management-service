import type { IdNumeric, IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { ICidade } from "@/modules/cidade";

export interface IEndereco {
  id: IdUuid;
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento: string | null;
  pontoReferencia: string | null;
  cidade: ICidade;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
