import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IPerfil } from "@/modules/acesso/perfil/domain/perfil";

export const perfilEntityDomainMapper = createEntityDomainMapper<IPerfil, Record<string, unknown>>({
  fields: [
    "id",
    "ativo",
    "cargo",
    { field: "campus", type: "relation" },
    { field: "usuario", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
