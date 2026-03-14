import { CidadeInputRef } from "@/modules/localidades/cidade";

export class EnderecoCreateCommand {
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade!: CidadeInputRef;
}
