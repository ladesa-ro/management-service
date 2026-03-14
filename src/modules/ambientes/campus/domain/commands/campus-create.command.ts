import { EnderecoCreateCommand } from "@/modules/localidades/endereco";

export class CampusCreateCommand {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoCreateCommand;
}
