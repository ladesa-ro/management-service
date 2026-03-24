import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";

export const ofertaFormacaoEntityDomainMapper = createEntityDomainMapper<
  IOfertaFormacao,
  Record<string, unknown>
>({
  fields: [
    "id",
    "nome",
    "slug",
    "duracaoPeriodoEmMeses",
    { field: "modalidade", type: "relation" },
    { field: "campus", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
