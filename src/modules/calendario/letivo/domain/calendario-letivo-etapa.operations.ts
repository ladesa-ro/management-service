import { createOperationMetadata } from "@/domain/abstractions";

export const CalendarioLetivoEtapaFindAllQueryMetadata = createOperationMetadata({
  operationId: "calendarioLetivoEtapaFindAll",
  summary: "Lista etapas do calendario letivo",
});

export const CalendarioLetivoEtapaBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "calendarioLetivoEtapaBulkReplace",
  summary: "Substitui datas das etapas do calendario letivo",
});

export const CalendarioLetivoDesativarCommandMetadata = createOperationMetadata({
  operationId: "calendarioLetivoDesativar",
  summary: "Desativa um calendario letivo (sem excluir)",
});
