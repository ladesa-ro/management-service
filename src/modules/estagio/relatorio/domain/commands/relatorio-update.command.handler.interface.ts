import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { RelatorioFindOneQuery, RelatorioFindOneQueryResult } from "../queries";
import type { RelatorioUpdateCommand } from "./relatorio-update.command";

export const RelatorioUpdateCommandMetadata = createOperationMetadata({
  operationId: "relatorioUpdate",
  summary: "Atualiza um relatório de estágio",
});

export const IRelatorioUpdateCommandHandler = Symbol("IRelatorioUpdateCommandHandler");

export type IRelatorioUpdateCommandHandler = ICommandHandler<
  RelatorioFindOneQuery & RelatorioUpdateCommand,
  RelatorioFindOneQueryResult
>;
