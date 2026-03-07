import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { CidadeFindOneOutputDto } from "./CidadeFindOneOutputDto";

export class EnderecoFindOneOutputDto extends EntityOutputDto {
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: CidadeFindOneOutputDto;
}
