import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { ITurma } from "@/modules/ensino/turma/domain/turma";

export const turmaEntityDomainMapper = createEntityDomainMapper<ITurma, Record<string, unknown>>({
  fields: [
    "id",
    "periodo",
    { field: "curso", type: "relation" },
    { field: "ambientePadraoAula", type: "relation" },
    { field: "imagemCapa", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
