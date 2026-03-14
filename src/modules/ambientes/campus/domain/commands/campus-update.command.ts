import { EnderecoUpdateCommand } from "@/modules/localidades/endereco";

export class CampusUpdateCommand {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: EnderecoUpdateCommand;
}
