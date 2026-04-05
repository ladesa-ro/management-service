import { createOperationMetadata } from "@/domain/abstractions";

export const CalendarioLetivoDesativarCommandMetadata = createOperationMetadata({
  operationId: "calendarioLetivoDesativar",
  summary: "Desativa um calendario letivo (sem excluir)",
});
