import { createOperationMetadata } from "@/domain/abstractions";

export const TurmaHorarioAulaFindAllQueryMetadata = createOperationMetadata({
  operationId: "turmaHorarioAulaFindAll",
  summary: "Lista horarios de aula selecionados da turma",
});

export const TurmaHorarioAulaBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "turmaHorarioAulaBulkReplace",
  summary: "Substitui horarios de aula selecionados da turma",
});
