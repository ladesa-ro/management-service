import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco";
import { CampusFields } from "../campus.fields";

export const CampusFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CampusFields,
};

export class CampusFindOneQueryResult extends EntityQueryResult {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoFindOneQueryResult;
}
