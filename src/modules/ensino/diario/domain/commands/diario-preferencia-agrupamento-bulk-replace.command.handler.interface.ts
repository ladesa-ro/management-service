import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "../queries";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "./diario-preferencia-agrupamento-bulk-replace.command";

export const DiarioPreferenciaAgrupamentoBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "diarioPreferenciaAgrupamentoBulkReplace",
  summary: "Substitui preferencias de agrupamento de um diario",
});

export const IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler",
);

export type IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler = ICommandHandler<
  DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  DiarioPreferenciaAgrupamentoListQueryResult
>;
