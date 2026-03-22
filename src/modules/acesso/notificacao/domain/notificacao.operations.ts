import { createOperationMetadata } from "@/domain/abstractions";

export const NotificacaoFindAllQueryMetadata = createOperationMetadata({
  operationId: "notificacaoFindAll",
  summary: "Lista notificacoes do usuario autenticado",
});

export const NotificacaoContagemNaoLidasQueryMetadata = createOperationMetadata({
  operationId: "notificacaoContagemNaoLidas",
  summary: "Conta notificacoes nao lidas",
});

export const NotificacaoMarcarLidaCommandMetadata = createOperationMetadata({
  operationId: "notificacaoMarcarLida",
  summary: "Marca notificacao como lida",
});
