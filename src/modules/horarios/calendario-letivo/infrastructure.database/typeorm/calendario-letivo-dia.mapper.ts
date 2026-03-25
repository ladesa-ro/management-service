import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";

export const calendarioLetivoDiaEntityDomainMapper = createEntityDomainMapper({
  fields: [
    "id",
    { field: "data", type: "date-only" },
    "diaLetivo",
    "feriado",
    "diaPresencial",
    "tipo",
    "extraCurricular",
    { field: "calendario", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
