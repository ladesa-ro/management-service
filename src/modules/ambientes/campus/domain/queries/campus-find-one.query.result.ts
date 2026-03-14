import { EntityQueryResult } from "@/domain/abstractions";
import { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco";

export class CampusFindOneQueryResult extends EntityQueryResult {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoFindOneQueryResult;
}
