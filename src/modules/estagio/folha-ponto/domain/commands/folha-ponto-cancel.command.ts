import { createOperationMetadata } from "@/domain/abstractions";

export const FolhaPontoCancelCommandMetadata = createOperationMetadata({
  operationId: "folhaPontoCancel",
  summary: "Cancela uma folha de ponto com status PENDING.",
});
