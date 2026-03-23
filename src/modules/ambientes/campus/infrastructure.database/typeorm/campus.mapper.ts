import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { ICampus } from "@/modules/ambientes/campus/domain/campus";

export const campusEntityDomainMapper = createEntityDomainMapper<ICampus, Record<string, unknown>>({
  fields: [
    "id",
    "nomeFantasia",
    "razaoSocial",
    "apelido",
    "cnpj",
    { field: "endereco", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
