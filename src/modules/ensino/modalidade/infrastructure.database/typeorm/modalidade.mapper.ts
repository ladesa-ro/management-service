import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IModalidade } from "@/modules/ensino/modalidade/domain/modalidade";

export const modalidadeEntityDomainMapper = createEntityDomainMapper<
  IModalidade,
  Record<string, unknown>
>({
  fields: [
    "id",
    "nome",
    "slug",
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
