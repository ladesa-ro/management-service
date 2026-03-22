import { createOperationMetadata } from "@/domain/abstractions";

export const CursoDisciplinasPorPeriodoFindAllQueryMetadata = createOperationMetadata({
  operationId: "cursoDisciplinasPorPeriodoFindAll",
  summary: "Lista disciplinas por periodo de um curso",
});

export const CursoDisciplinasPorPeriodoBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "cursoDisciplinasPorPeriodoBulkReplace",
  summary: "Substitui disciplinas por periodo de um curso",
});
