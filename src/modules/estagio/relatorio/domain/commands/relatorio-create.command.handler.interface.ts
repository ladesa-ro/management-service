import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { RelatorioFindOneQueryResult } from "../queries/relatorio-find-one.query.result";
import type { RelatorioCreateCommand } from "./relatorio-create.command";

export const RelatorioCreateCommandMetadata = createOperationMetadata({
  operationId: "relatorioCreate",
  summary: "Envia ou salva um relatório de estágio",
});

export const IRelatorioCreateCommandHandler = Symbol("IRelatorioCreateCommandHandler");

export type IRelatorioCreateCommandHandler = ICommandHandler<
  RelatorioCreateCommand,
  RelatorioFindOneQueryResult
>;
