import { EnderecoCreateCommand } from "@/modules/localidades/endereco";
import { CampusFields } from "../campus.fields";

export const CampusCreateCommandFields = {
  nomeFantasia: CampusFields.nomeFantasia,
  razaoSocial: CampusFields.razaoSocial,
  apelido: CampusFields.apelido,
  cnpj: CampusFields.cnpj,
  endereco: CampusFields.endereco,
};

export class CampusCreateCommand {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoCreateCommand;
}
