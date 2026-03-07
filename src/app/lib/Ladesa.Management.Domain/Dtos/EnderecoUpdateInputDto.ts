import type { CidadeInputRefDto } from "./CidadeInputRefDto";

export class EnderecoUpdateInputDto {
  cep?: string;
  logradouro?: string;
  numero?: number;
  bairro?: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade?: CidadeInputRefDto;
}
