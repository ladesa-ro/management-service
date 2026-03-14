import { EntityQueryResult } from "@/domain/abstractions";
import { CidadeFindOneQueryResult } from "@/modules/localidades/cidade";

export class EnderecoFindOneQueryResult extends EntityQueryResult {
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: CidadeFindOneQueryResult;
}
