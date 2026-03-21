import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "../queries";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "./diario-preferencia-agrupamento-bulk-replace.command";

export type IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler = ICommandHandler<
  DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  DiarioPreferenciaAgrupamentoListQueryResult
>;
export const IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler",
);
