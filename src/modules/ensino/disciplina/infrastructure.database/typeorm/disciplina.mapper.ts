import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IDisciplina } from "@/modules/ensino/disciplina/domain/disciplina";

export const disciplinaEntityDomainMapper = createEntityDomainMapper<
  IDisciplina,
  Record<string, unknown>
>({
  fields: [
    "id",
    "nome",
    "nomeAbreviado",
    "cargaHoraria",
    { field: "imagemCapa", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
