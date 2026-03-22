import { EntityQueryResult } from "@/domain/abstractions";
import {
  commonProperties,
  defineModel,
  referenceProperty,
  simpleProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
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

defineModel("EnderecoFindOneQueryResult", [
  simpleProperty("id"),
  simpleProperty("cep"),
  simpleProperty("logradouro"),
  simpleProperty("numero"),
  simpleProperty("bairro"),
  simpleProperty("complemento", { nullable: true }),
  simpleProperty("pontoReferencia", { nullable: true }),
  referenceProperty("cidade", "CidadeFindOneQueryResult"),
  ...commonProperties.dated,
]);
