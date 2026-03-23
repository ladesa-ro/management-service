import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { ICurso } from "@/modules/ensino/curso/domain/curso";

export const cursoEntityDomainMapper = createEntityDomainMapper<ICurso, Record<string, unknown>>({
  fields: [
    "id",
    "nome",
    "nomeAbreviado",
    { field: "campus", type: "relation" },
    { field: "ofertaFormacao", type: "relation" },
    { field: "imagemCapa", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
