import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IBloco } from "@/modules/ambientes/bloco/domain/bloco";

export const blocoEntityDomainMapper = createEntityDomainMapper<IBloco, Record<string, unknown>>({
  fields: [
    "id",
    "nome",
    "codigo",
    { field: "campus", type: "relation" },
    { field: "imagemCapa", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
