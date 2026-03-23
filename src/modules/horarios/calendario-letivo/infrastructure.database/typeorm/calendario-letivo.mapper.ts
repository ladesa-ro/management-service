import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";

export const calendarioLetivoEntityDomainMapper = createEntityDomainMapper({
  fields: [
    "id",
    "nome",
    "ano",
    { field: "campus", type: "relation" },
    { field: "ofertaFormacao", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
