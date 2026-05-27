import { EnderecoInputRef } from "@/modules/localidades/endereco/domain/shared";
import { EmpresaFields } from "../empresa.fields";

export const EmpresaUpdateCommandFields = {
  razaoSocial: EmpresaFields.razaoSocial,
  nomeFantasia: EmpresaFields.nomeFantasia,
  cnpj: EmpresaFields.cnpj,
  telefone: EmpresaFields.telefone,
  email: EmpresaFields.email,
  endereco: EmpresaFields.endereco,
};

export class EmpresaUpdateCommand {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: EnderecoInputRef;
}
