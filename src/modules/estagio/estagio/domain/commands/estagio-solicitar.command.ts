import { EmpresaCreateCommandFields } from "@/modules/estagio/empresa/domain/commands/empresa-create.command";
import type { EnderecoInputRef } from "@/modules/localidades/endereco/domain/shared";

export const EstagioSolicitarCommandFields = {
  ...EmpresaCreateCommandFields,
};

export class EstagioSolicitarCommand {
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  endereco!: EnderecoInputRef;
}
