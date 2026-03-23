import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente";

export const ambienteEntityDomainMapper = createEntityDomainMapper<
  IAmbiente,
  Record<string, unknown>
>({
  fields: [
    "id",
    "nome",
    "descricao",
    "codigo",
    "capacidade",
    "tipo",
    { field: "bloco", type: "relation" },
    { field: "imagemCapa", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
