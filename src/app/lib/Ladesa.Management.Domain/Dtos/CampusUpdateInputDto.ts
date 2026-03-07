import type { EnderecoUpdateInputDto } from "./EnderecoUpdateInputDto";

export class CampusUpdateInputDto {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: EnderecoUpdateInputDto;
}
