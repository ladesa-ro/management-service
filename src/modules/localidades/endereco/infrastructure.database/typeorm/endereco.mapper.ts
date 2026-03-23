import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IEndereco } from "@/modules/localidades/endereco/domain/endereco";
import type { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco/domain/queries";
import { dateToISO } from "@/shared/mapping/transforms";

export const enderecoEntityDomainMapper = createEntityDomainMapper<
  IEndereco,
  Record<string, unknown>,
  EnderecoFindOneQueryResult
>({
  fields: [
    "id",
    "cep",
    "logradouro",
    "numero",
    "bairro",
    "complemento",
    "pontoReferencia",
    { field: "cidade", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
  output: [
    "id",
    "cep",
    "logradouro",
    "numero",
    "bairro",
    "complemento",
    "pontoReferencia",
    "cidade",
    ["dateCreated", "dateCreated", dateToISO],
    ["dateUpdated", "dateUpdated", dateToISO],
    ["dateDeleted", "dateDeleted", dateToISO],
  ],
});
