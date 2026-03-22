import { EnderecoUpdateCommand } from "@/modules/localidades/endereco";
import { CampusFields } from "../campus.fields";

export const CampusUpdateCommandFields = {
  nomeFantasia: CampusFields.nomeFantasia,
  razaoSocial: CampusFields.razaoSocial,
  apelido: CampusFields.apelido,
  cnpj: CampusFields.cnpj,
  endereco: CampusFields.endereco,
};

export class CampusUpdateCommand {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: EnderecoUpdateCommand;
}
