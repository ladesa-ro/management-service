import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";

export const diarioEntityDomainMapper = createEntityDomainMapper<IDiario, Record<string, unknown>>({
  fields: [
    "id",
    "ativo",
    { field: "calendarioLetivo", type: "relation" },
    { field: "turma", type: "relation" },
    { field: "disciplina", type: "relation" },
    { field: "ambientePadrao", type: "relation" },
    { field: "imagemCapa", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
