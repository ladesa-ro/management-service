import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { EnderecoFindOneOutputDto } from "./EnderecoFindOneOutputDto";

export class CampusFindOneOutputDto extends EntityOutputDto {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoFindOneOutputDto;
}
