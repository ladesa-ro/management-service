import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Cidade } from "@/Ladesa.Management.Domain/Entities/Cidade";

export interface EnderecoCreateDto {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade: IFindOneByIdDto<Cidade["id"]>;
}
