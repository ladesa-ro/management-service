import { createOperationMetadata } from "@/domain/abstractions";

export const PerfilEnsinoByIdQueryMetadata = createOperationMetadata({
  operationId: "perfilEnsinoById",
  summary: "Busca dados de ensino de um perfil",
});
