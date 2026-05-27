import { EnderecoInputRef } from "@/modules/localidades/endereco/domain/shared";
import { EmpresaFields } from "../empresa.fields";

export const EmpresaUpdateCommandFields = {
  razaoSocial: EmpresaFields.razaoSocial,
  nomeFantasia: EmpresaFields.nomeFantasia,
  cnpj: EmpresaFields.cnpj,
  telefone: EmpresaFields.telefone,
  email: EmpresaFields.email,
  fotoEmpresa: EmpresaFields.fotoEmpresa,
  endereco: EmpresaFields.endereco,
};

export class EmpresaUpdateCommand {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  fotoEmpresa?: { id: string } | null;
  endereco?: EnderecoInputRef;
}
