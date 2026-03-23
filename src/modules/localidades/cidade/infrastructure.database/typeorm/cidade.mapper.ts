import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { ICidade } from "@/modules/localidades/cidade/domain/cidade";
import type { CidadeFindOneQueryResult } from "@/modules/localidades/cidade/domain/queries";

export const cidadeEntityDomainMapper = createEntityDomainMapper<
  ICidade,
  Record<string, unknown>,
  CidadeFindOneQueryResult
>({
  fields: ["id", "nome", { field: "estado", type: "relation-loaded" }],
});
