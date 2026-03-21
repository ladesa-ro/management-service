import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "../queries";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "./diario-preferencia-agrupamento-bulk-replace.command";

export const IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler",
);

export type IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler = ICommandHandler<
  DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  DiarioPreferenciaAgrupamentoListQueryResult
>;
