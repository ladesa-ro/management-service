import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { INivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";

export const nivelFormacaoEntityDomainMapper = createEntityDomainMapper<
  INivelFormacao,
  Record<string, unknown>
>({
  fields: [
    "id",
    "slug",
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
