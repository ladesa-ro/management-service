import { createOperationMetadata } from "@/domain/abstractions";

export const OfertaFormacaoPeriodoFindAllQueryMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoPeriodoFindAll",
  summary: "Lista periodos de uma oferta de formacao",
});

export const OfertaFormacaoPeriodoBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoPeriodoBulkReplace",
  summary: "Substitui periodos e etapas de uma oferta de formacao",
});
