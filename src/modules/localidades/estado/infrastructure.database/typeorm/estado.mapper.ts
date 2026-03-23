import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IEstado } from "@/modules/localidades/estado/domain/estado";
import type { EstadoFindOneQueryResult } from "@/modules/localidades/estado/domain/queries";

export const estadoEntityDomainMapper = createEntityDomainMapper<
  IEstado,
  Record<string, unknown>,
  EstadoFindOneQueryResult
>({
  fields: ["id", "nome", "sigla"],
});
