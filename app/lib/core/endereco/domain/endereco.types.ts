import type { IdNumeric, IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { ICidade } from "@/core/cidade";

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
