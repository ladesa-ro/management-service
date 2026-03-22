import { createOperationMetadata } from "@/domain/abstractions";

export const AutenticacaoWhoAmIEnsinoQueryMetadata = createOperationMetadata({
  operationId: "autenticacaoWhoAmIEnsino",
  summary: "Retorna informacoes de ensino do usuario logado",
});
