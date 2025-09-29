import { Cidade } from "@/features/cidade";
import { BaseDatedEntity, BaseUuidEntity } from "@/shared";

export type Endereco = BaseUuidEntity &
  BaseDatedEntity & {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
  pontoReferencia: string | null;
  cidade: Cidade;
};
