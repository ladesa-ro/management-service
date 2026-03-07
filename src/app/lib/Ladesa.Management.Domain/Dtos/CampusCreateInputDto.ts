import type { EnderecoCreateInputDto } from "./EnderecoCreateInputDto";

export class CampusCreateInputDto {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoCreateInputDto;
}
