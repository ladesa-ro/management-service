import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco";
import { EmpresaFields } from "../empresa.fields";

export const EmpresaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EmpresaFields,
};

export class EmpresaFindOneQueryResult extends EntityQueryResult {
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  endereco!: EnderecoFindOneQueryResult;
  ativo!: boolean;
}
