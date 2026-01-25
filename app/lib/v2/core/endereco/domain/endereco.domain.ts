import { Cidade } from "../../cidade/domain/cidade.domain";

export class Endereco {
  id!: string;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: Cidade;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
